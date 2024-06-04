import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
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
  DivContainerWrapper,
  DivFilter,
  DivHeaderWrapper,
} from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { BaseRecord, baseInstance } from 'shared/interfaces'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import DeleteCandidateModal from '../../page-sections/DeleteCandidateModal'
import { KeyboardEventHandler, useMemo, useState } from 'react'
import { getValueOfObj, transformListItem } from 'shared/utils/utils'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import RemoveBlackListIcon from 'shared/components/icons/RemoveBlackListIcon'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ButtonFieldFilter from 'shared/components/input-fields/ButtonFieldFilter'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import { isEmpty } from 'lodash'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { IOption } from 'shared/components/autocomplete/autocomplete-base/interface'
import BlackListCandidateModal from '../BlackListCandidateModal'

const BlackList = () => {
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
  const [failedReason, setFailedReason] = useState<BaseRecord[]>([])
  const [status, setStatus] = useState<BaseRecord[]>([])
  const [searchField, setSearchField] = useState('')

  const showFailedReason = useMemo(() => {
    return (
      getValueOfObj({ key: 'value', obj: status }) === STATUS_CANDIDATE.KIV ||
      getValueOfObj({ key: 'value', obj: status }) ===
        STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [status])

  const { useTableReturn } = useCandidateTable({
    filter: {
      is_black_list: true,
    },
  })
  const { handleFilter, handleFreeWordMultiple } = useTableReturn
  const translation = useTextTranslation()

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
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      {
        id: 'edit',
        onClick: (id) => {
          handleOpenBlackList(id)
        },
        title: 'Remove from blacklist',
        Icon: <RemoveBlackListIcon />,
      },
      {
        id: 'delete',
        onClick: (id) => {
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
      handleFreeWordMultiple({
        name: searchField,
        phone: searchField,
        email: searchField,
      })
    }
  }

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox width={'100%'}>
            <DivFilter>
              <ButtonFieldFilter<baseInstance>
                inputLabel={'Status'}
                listSelected={status}
                setListSelected={setStatus}
                onChange={(data) => {
                  //@ts-ignore
                  const status = transformListItem(data, 'id')
                  handleFilter('status', !isEmpty(status) ? status : null)
                }}
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
                    disableCloseOnSelect={true}
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
                  inputLabel={'Failed reason'}
                  listSelected={failedReason}
                  setListSelected={setFailedReason}
                  onChange={(data) => {
                    //@ts-ignore
                    const failedRS = transformListItem(data, 'value')
                    handleFilter(
                      'failed_reason',
                      !isEmpty(failedRS) ? failedRS : null
                    )
                  }}
                  node={
                    <FailedReasonAutoComplete
                      multiple
                      value={failedReason.map((item) => item.value)}
                      onChange={(data: IOption[]) => {
                        const filter_reason = transformListItem(data, 'value')

                        handleFilter('failed_reason', filter_reason)
                        setFailedReason(data)
                      }}
                      open={true}
                      disableCloseOnSelect={true}
                      textFieldProps={{
                        label: 'Failed reason',
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
              label="Search by name, email, phone"
              variant="outlined"
              size="small"
              sx={{ width: '400px', fontSize: '13px' }}
              onKeyUp={handleFreeWorld}
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon
                        sx={{ fontSize: '16px' }}
                        onClick={() => {
                          handleFreeWordMultiple({
                            name: searchField,
                            phone: searchField,
                            email: searchField,
                          })
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
        <BlackListCandidateModal
          open={openBlackList}
          setOpen={setOpenBlackList}
          id={rowId.current}
        />
      )}
    </DivContainerWrapper>
  )
}

export default BlackList
