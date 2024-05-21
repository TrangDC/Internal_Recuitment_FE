import { IconButton, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import CustomTable from 'shared/components/table/CustomTable'
import { columns } from '../providers/constants/columns'
import useTeamTable from '../providers/hooks/useHiringTable'
import CreateHiringModal from '../page-sections/CreateHiringModal'
import useBuildColumnTable from 'shared/hooks/useBuildColumnTable'
import useActionTable from '../providers/hooks/useActionTable'
import EditHiringModal from '../page-sections/EditHiringModal'
import SearchIcon from 'shared/components/icons/SearchIcon'
import { CustomTextField } from 'shared/components/form/styles'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  DivFilter,
  DivHeaderWrapper,
} from 'features/candidates/presentation/providers/styles'
import ButtonFilter from 'shared/components/input-fields/ButtonFilter'
import { Team } from 'features/teams/domain/interfaces'
import useTextTranslation from 'shared/constants/text'
import useSelectTeam from 'shared/hooks/graphql/useSelecTeam'
import DeleteHiringModal from '../page-sections/DeleteHiringModal'
import { convertEmptyToNull, transformListItem } from 'shared/utils/utils'
import { KeyboardEventHandler } from 'react'

const HiringList = () => {
  const {
    openCreate,
    setOpenCreate,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
  } = useActionTable()
  const { useTableReturn } = useTeamTable()
  const { handleFreeWord, handleFilter } = useTableReturn
  const { colummTable } = useBuildColumnTable({
    actions: [
      {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    ],
    columns,
  })
  const { teams } = useSelectTeam()

  const translation = useTextTranslation()

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleFreeWord('name', event.target.value)
    }
  }

  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Hiring Team'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <DivFilter>
            <ButtonFilter<Team>
              listData={teams}
              inputLabel={translation.MODLUE_TEAMS.teams}
              callbackChange={(obj) => {
                handleFilter(
                  'team_ids',
                  convertEmptyToNull(transformListItem(obj))
                )
              }}
            />
          </DivFilter>
          <DivHeaderWrapper>
            <CustomTextField
              id="outlined-basic"
              label={'Search by name, email'}
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
        <CreateHiringModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditHiringModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDelete && (
        <DeleteHiringModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default HiringList
