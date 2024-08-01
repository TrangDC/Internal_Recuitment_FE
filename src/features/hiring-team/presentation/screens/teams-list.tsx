import { Box } from '@mui/system'
import Add from 'shared/components/icons/Add'
import { columns } from '../../shared/constants/columns'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import {
  CreateTeamModal,
  DeleteTeamModal,
  EditTeamModal,
} from '../page-sections'
import { useBuildColumnTable, CustomTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import Cant from 'features/authorization/presentation/components/Cant'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import useActionTable from 'features/hiring-team/hooks/table/useActionTable'
import useFilterTeams from 'features/hiring-team/hooks/table/useFilterTeams'
import useTeamTable from 'features/hiring-team/hooks/table/useTeamTable'
import useBuildActionsTableTeam from 'features/hiring-team/hooks/table/useBuildActionsTableTeam'
import { Fragment } from 'react/jsx-runtime'

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
  const { actions } = useBuildActionsTableTeam(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    columns,
    actions: actions,
  })

  return (
    <Fragment>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
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
    </Fragment>
  )
}

export default TeamList
