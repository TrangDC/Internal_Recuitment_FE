import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../../shared/constants/columns'
import useTextTranslation from 'shared/constants/text'
import TeamIcon from 'shared/components/icons/Team'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import IconScreen from 'shared/components/utils/IconScreen'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  CreateTeamModal,
  DeleteTeamModal,
  EditTeamModal,
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import Cant from 'features/authorization/presentation/components/Cant'
import useActionTable from 'features/teams/hooks/table/useActionTable'
import useFilterTeams from 'features/teams/hooks/table/useFilterTeams'
import useTeamTable from 'features/teams/hooks/table/useTeamTable'
import useBuildActionsTableTeam from 'features/teams/hooks/table/useBuildActionsTableTeam'

const TeamList = () => {
  const useActionTableReturn = useActionTable()
  const {
    openCreate,
    openDelete,
    setOpenCreate,
    openEdit,
    rowId,
    setOpenEdit,
    setOpenDelete,
  } = useActionTableReturn
  const { useSearchListReturn } = useFilterTeams()
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useTeamTable({
    search,
  })
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTableTeam(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    columns,
    actions: actions,
  })

  return (
    <Box pt={2} pb={4}>
      <Box>
        <IconScreen
          Icon={TeamIcon}
          textLable={translation.MODLUE_TEAMS.teams}
        />
      </Box>
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <SearchInput
            ref={searchRef}
            onEnter={handleSearch}
            placeholder="Search by Team's name"
            onSearch={handleSearch}
          />
          <Cant
            module={'HIRING_TEAMS'}
            checkBy={{
              compare: 'hasAny',
              permissions: [
                'CREATE.everything',
                'CREATE.ownedOnly',
                'CREATE.teamOnly',
              ],
            }}
          >
            <ButtonAdd
              Icon={Add}
              textLable={translation.MODLUE_TEAMS.add_a_new_team}
              onClick={() => setOpenCreate(true)}
            />
          </Cant>
        </HeadingWrapper>
        <Box>
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        </Box>
      </BoxWrapperOuterContainer>

      {openCreate && (
        <CreateTeamModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditTeamModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteTeamModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Box>
  )
}

export default TeamList
