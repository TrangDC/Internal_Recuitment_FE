import { Box } from '@mui/system'
import { columns } from '../../providers/constants/columns'
import useCandidateTable from '../../providers/hooks/useCandidateTable'
import useActionTable from '../../providers/hooks/useActionTable'
import { DivContainerWrapper, DivHeaderWrapper } from '../../providers/styles'
import { Candidate } from 'features/candidates/domain/interfaces'
import EditIcon from 'shared/components/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import { useMemo, useState } from 'react'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import RemoveBlackListIcon from 'shared/components/icons/RemoveBlackListIcon'
import FlexBox from 'shared/components/flexbox/FlexBox'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import FailedReasonAutoComplete from 'shared/components/autocomplete/failed-reason-auto-complete'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import {
  BlackListCandidateModal,
  CreateCandidateModal,
  DeleteCandidateModal,
  EditCandidateModal,
} from '../index'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useFilterCandidates from '../../providers/hooks/useFilterCandidates'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import SearchInput from 'shared/components/table/components/SearchInput'

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
  const [status, setStatus] = useState<string>('')
  const { useFilterReturn, useSearchListReturn } = useFilterCandidates()
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn
  const showFailedReason = useMemo(() => {
    return (
      status === STATUS_CANDIDATE.KIV ||
      status === STATUS_CANDIDATE.OFFERED_LOST
    )
  }, [status])

  const { useTableReturn } = useCandidateTable({
    filters: {
      is_black_list: true,
      ...dataFilterWithValue,
    },
    search,
  })
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

  return (
    <DivContainerWrapper>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox width={'100%'}>
            <ControllerFilter
              control={controlFilter}
              keyName="status"
              title="Status"
              Node={({ onFilter, value }) => (
                <CandidateStatusAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => {
                    onFilter(data)
                    setStatus(data?.value ?? '')
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
          </FlexBox>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by name, email, phone"
              onSearch={handleSearch}
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

export default BlackList
