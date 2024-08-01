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
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'

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
  const { useSearchListReturn, useFilterReturn } = useFilterTeams()
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { search, handleSearch, searchRef } = useSearchListReturn

  const { useTableReturn } = useTeamTable({
    search,
    filters: dataFilterWithValue,
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
        <IconScreen Icon={TeamIcon} textLable="Teams" />
      </Box>

      <BoxWrapperOuterContainer>
        <HeadingWrapper>
         <FlexBox flexDirection={'column'} width={'100%'} gap={2}>
         <FlexBox>
            <ControllerFilter
              control={controlFilter}
              title="Manager"
              keyName={'manager_ids'}
              Node={({ onFilter, value }) => (
                <InterViewerAutoComplete
                  name="requester"
                  multiple={true}
                  value={value}
                  onCustomChange={(data) => {
                    onFilter(
                      data.map((value) => ({
                        label: value.name,
                        value: value.id,
                      }))
                    )
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Requester',
                    autoFocus: true,
                  }}
                />
              )}
            />
          </FlexBox>
          <FlexBox justifyContent={'space-between'}>
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
                textLable="Add a new hiring team"
                onClick={() => setOpenCreate(true)}
              />
            </Cant>
          </FlexBox>
         </FlexBox>
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
