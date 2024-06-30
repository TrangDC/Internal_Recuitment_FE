import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useCandidateTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import BlackListIcon from 'shared/components/icons/BlackListIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { Fragment, useMemo, useRef, useState } from 'react'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { handleImportFile } from '../../providers/utils'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import CandidateStatusAutoComplete, {
  options_status_new,
} from 'shared/components/autocomplete/candidate-status-auto-complete'
import {
  downloadBase64File,
  getDomain,
  handleCopyClipBoard,
} from 'shared/utils/utils'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { useImportFile } from 'shared/hooks/graphql/useUpload'
import { ArrowDownward } from '@mui/icons-material'
import { MenuItemComponent } from 'shared/components/menuItemComponent'
import DownloadIcon from 'shared/components/icons/DownloadIcon'
import useExportSample from '../../providers/hooks/useExportSample'
import {
  BlackListCandidateModal,
  CreateCandidateModal,
  DeleteCandidateModal,
  EditCandidateModal,
} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import useFilterCandidates from '../../providers/hooks/useFilterCandidates'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import SearchInput from 'shared/components/table/components/SearchInput'
import useTextTranslation from 'shared/constants/text'
import ControllerDateRange from 'shared/components/table/components/tooltip-filter/ControllerDateRange'
import dayjs from 'dayjs'
import AppDateRangePicker from 'shared/components/input-fields/AppDateRangePicker'
import LinkIcon from 'shared/components/icons/Link'

const Candidates = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    rowId,
    setOpenEdit,
    openBlackList,
    handleOpenBlackList,
    setOpenBlackList,
  } = useActionTable<Candidate>()
  const is_black_list = false
  const navigate = useNavigate()
  const translation = useTextTranslation()
  const [status, setStatus] = useState<string>('')
  const { useFilterReturn, useSearchListReturn } = useFilterCandidates({
    is_black_list,
  })
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn
  const refInput = useRef<HTMLInputElement>(null)
  const { useTableReturn } = useCandidateTable({
    filters: {
      is_black_list,
      ...dataFilterWithValue,
    },
    search,
  })
  const showFailedReason = useMemo(() => {
    return (
      dataFilterWithValue.status === STATUS_CANDIDATE.KIV ||
      dataFilterWithValue.status === STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [dataFilterWithValue])

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/candidate-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'copy-link-to-profile',
        onClick: (id, rowData) => {
          const url = `${getDomain()}/dashboard/candidate-detail/${id}`
          handleCopyClipBoard(
            url,
            `[PROFILE] ${rowData.name}${rowData.dob ? '_' + dayjs(rowData.dob).format('DDMMYYYY') : ''}`
          )
        },
        title: 'Copy application link',
        Icon: <LinkIcon />,
      },
      {
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'black_list',
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: translation.COMMON.add_to_blackList,
        Icon: <BlackListIcon />,
      },
      {
        id: 'delete',
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })
  const { base64Example } = useExportSample()
  const { submit } = useImportFile()

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox width={'100%'} gap={'16px'}>
            <ControllerFilter
              control={controlFilter}
              keyName="status"
              title="Status"
              Node={({ onFilter, value }) => (
                <CandidateStatusAutoComplete
                  multiple={false}
                  options={options_status_new}
                  value={value}
                  onChange={(data) => {
                    onFilter(data)
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              )}
            />
            {showFailedReason && (
              <ControllerFilter
                control={controlFilter}
                keyName="failed_reason"
                title="Failed reason"
                Node={({ onFilter, value }) => (
                  <FailedReasonAutoComplete
                    multiple={true}
                    value={value}
                    onChange={(data) => {
                      onFilter(data)
                    }}
                    open={true}
                    disableCloseOnSelect={true}
                    textFieldProps={{
                      label: 'Failed reason',
                      autoFocus: true,
                    }}
                  />
                )}
              />
            )}
            {/* add */}
            <ControllerFilter
              control={controlFilter}
              keyName="reference_uid"
              title="By recruiter"
              Node={({ onFilter, value }) => (
                <InterViewerAutoComplete
                  multiple={true}
                  value={value}
                  name="reference_uid"
                  onCustomChange={(data) => {
                    onFilter(
                      data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    )
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'By recruiter',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerDateRange
              control={controlFilter}
              keyNameFrom="recruit_time_from_date"
              keyNameTo="recruit_time_to_date"
              title="Recruit time"
              Node={({ onFilterFrom, onFilterTo, fromValue, toValue }) => (
                <AppDateRangePicker
                  setFromDate={(date) =>
                    onFilterFrom({
                      label: date?.format('DD/MM/YYYY') ?? '',
                      value: date?.toISOString() ?? '',
                    })
                  }
                  setToDate={(date) =>
                    onFilterTo({
                      label: date?.format('DD/MM/YYYY') ?? '',
                      value: date?.toISOString() ?? '',
                    })
                  }
                  fromDate={fromValue ? dayjs(fromValue) : null}
                  toDate={toValue ? dayjs(toValue) : null}
                />
              )}
            />
          </FlexBox>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by name, email, phone"
              onSearch={handleSearch}
            />
            <FlexBox gap={'10px'}>
              <Fragment>
                <MenuItemComponent
                  actions={[
                    {
                      Icon: <DownloadIcon />,
                      title: 'Download Template',
                      id: 'download',
                      onClick: () => {
                        downloadBase64File(
                          base64Example,
                          'candidate_example.xlsx',
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        )
                      },
                    },
                    {
                      Icon: (
                        <DownloadIcon
                          sx={{ transform: 'rotate(-90deg)', fontSize: '16px' }}
                        />
                      ),
                      title: 'Import',
                      id: 'import',
                      onClick: () => {
                        console.log('import file', refInput.current?.click())
                      },
                    },
                  ]}
                  Button={
                    <ButtonAdd
                      Icon={ArrowDownward}
                      textLable={'Import'}
                      position_icon="end"
                    />
                  }
                />
                <input
                  ref={refInput}
                  type="file"
                  id="fileImport"
                  name="file"
                  accept=".xls,.xlsx,.csv"
                  hidden
                  onChange={(event) => {
                    const fileEvent = event.target.files
                    fileEvent &&
                      handleImportFile(
                        fileEvent[0],
                        {
                          regexString: '^.*\\.(xls|xlsx|csv)$',
                          maxSize: 20,
                        },
                        submit
                      )
                    event.target.value = ''
                  }}
                />
              </Fragment>

              <ButtonAdd
                Icon={Add}
                textLable={translation.MODLUE_CANDIDATES.add_new_candidate}
                onClick={() => setOpenCreate(true)}
              />
            </FlexBox>
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={colummTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateCandidateModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteCandidateModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
      {openBlackList && (
        <BlackListCandidateModal
          open={openBlackList}
          setOpen={setOpenBlackList}
          id={rowId.current}
        />
      )}
    </DivContainerWrapper>
  )
}

export default Candidates
