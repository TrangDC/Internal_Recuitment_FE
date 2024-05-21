import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Add from 'shared/components/icons/Add'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useCandidateTable'
import CreateCandiateModal from '../../page-sections/CreateCandidateModal/index'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../../providers/hooks/useActionTable'
import EditCandidateModal from '../../page-sections/EditCandidateModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import {
  BtnImport,
  DivContainerWrapper,
  DivFilter,
  DivHeaderWrapper,
} from '../../providers/styles'
import Import from 'shared/components/icons/ImportIcon'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { BaseRecord, baseInstance } from 'shared/interfaces'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import BlackListIcon from 'shared/components/icons/BlackListIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import DeleteCandidateModal from '../../page-sections/DeleteCandidateModal'
import { Fragment, KeyboardEventHandler, useMemo, useState } from 'react'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import AddBlackListCandidateModal from '../AddBlackListCandidateModal'
import { handleImportFile } from '../../providers/utils'
import ButtonFieldFilter from 'shared/components/input-fields/ButtonFieldFilter'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import { getValueOfObj } from 'shared/utils/utils'
import { STATUS_CANDIDATE } from 'shared/constants/constants'

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
    rowData,
    setOpenEdit,
    openBlackList,
    handleOpenBlackList,
    setOpenBlackList,
  } = useActionTable<Candidate>()

  const navigate = useNavigate()

  const { useTableReturn } = useCandidateTable({
    filter: {
      is_black_list: false,
    },
  })
  const { handleFreeWord, handleFilter } = useTableReturn
  const translation = useTextTranslation()
  const [failedReason, setFailedReason] = useState<BaseRecord[]>([])
  const [status, setStatus] = useState<BaseRecord[]>([])

  const showFailedReason = useMemo(() => {
    return (
      getValueOfObj({ key: 'value', obj: status }) === STATUS_CANDIDATE.KIV ||
      getValueOfObj({ key: 'value', obj: status }) ===
        STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [status])

  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'detail',
        onClick: (id, rowData) => {
          navigate(`/dashboard/candidate-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'black_list',
        onClick: (id, rowData) => {
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

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer>
        <HeadingWrapper sx={{ marginTop: 0 }}>
          <FlexBox width={'100%'}>
            <DivFilter>
              <ButtonFieldFilter<baseInstance>
                inputLabel={'Status'}
                listSelected={status}
                setListSelected={setStatus}
                node={
                  <CandidateStatusAutoComplete
                    multiple={false}
                    value={getValueOfObj({ key: 'value', obj: status })}
                    onChange={(data: any) => {
                      setStatus(data)
                      handleFilter(
                        'status',
                        getValueOfObj({ key: 'value', obj: data })
                      )
                    }}
                    open={true}
                    textFieldProps={{
                      label: 'Status',
                      autoFocus: true,
                    }}
                  />
                }
              />
            </DivFilter>
            <DivFilter>
              {showFailedReason && (
                <ButtonFieldFilter<baseInstance>
                  inputLabel={'Failed Reason'}
                  listSelected={failedReason}
                  setListSelected={setFailedReason}
                  node={
                    <FailedReasonAutoComplete
                      multiple
                      value={failedReason.map((item) => item.value)}
                      onChange={(data: any) => {
                        setFailedReason(data)
                      }}
                      open={true}
                      textFieldProps={{
                        label: 'Failed Reason',
                        autoFocus: true,
                      }}
                    />
                  }
                />
              )}
            </DivFilter>
          </FlexBox>

          <DivHeaderWrapper>
            <CustomTextField
              label={translation.COMMON.search}
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onKeyUp={handleFreeWorld}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FlexBox gap={'10px'}>
              <Fragment>
                <label htmlFor={'fileImport'}>
                  <BtnImport>
                    <Import sx={{ fontSize: 15 }} />
                    {translation.COMMON.import}
                  </BtnImport>
                </label>
                <input
                  type="file"
                  id="fileImport"
                  name="file"
                  // accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
                  accept=".xls,.xlsx,.csv"
                  hidden
                  onChange={(event) => {
                    const fileEvent = event.target.files
                    fileEvent && handleImportFile(fileEvent[0])
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
        <CreateCandiateModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditCandidateModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
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
        <AddBlackListCandidateModal
          open={openBlackList}
          setOpen={setOpenBlackList}
          id={rowId.current}
          title={translation.MODLUE_CANDIDATES.add_blackList}
        />
      )}
    </DivContainerWrapper>
  )
}

export default Candidates
