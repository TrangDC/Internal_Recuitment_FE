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
import { baseInstance } from 'shared/interfaces'
import { useNavigate } from 'react-router-dom'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import DeleteCandidateModal from '../../page-sections/DeleteCandidateModal'
import BlackListCandidateModal from '../../page-sections/BlackListCandidateModal'
import { KeyboardEventHandler } from 'react'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import { STATUS_CANDIDATE_DATA } from '../../providers/constants'
import { getValueOfObj } from 'shared/utils/utils'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'

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

  const { useTableReturn } = useCandidateTable({
    filter: {
      is_black_list: true,
    },
  })
  const { handleFreeWord, handleFilter } = useTableReturn
  const translation = useTextTranslation()

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
          <DivFilter>
            <ButtonFilter<baseInstance>
              listData={STATUS_CANDIDATE_DATA}
              inputLabel={translation.COMMON.status}
              multiple={false}
              callbackChange={(obj) => {
                handleFilter('status', getValueOfObj({ key: 'value', obj }))
              }}
            />
          </DivFilter>
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
