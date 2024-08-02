import { Box } from '@mui/system'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import { DivHeaderWrapper } from 'features/candidates/shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import EditHiringModal from '../screen-sections/EditUserModal'
import { columns } from 'features/user/shared/constants/columns'
import useFilterUser from 'features/user/hooks/table/useFilterUser'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import RoleTemplateAutoComplete from 'shared/components/autocomplete/role-template-autocomplete'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import useActionTable from 'features/user/hooks/table/useActionTable'
import useUserTable from 'features/user/hooks/table/useUserTable'
import useBuildActionsTableUser from 'features/user/hooks/table/useBuildActionsTableUser'
import DetailHiringModal from '../screen-sections/DetaiUserModal'
import User from 'shared/schema/database/user'
import _ from 'lodash'
import TeamTypeAutoComplete, {
  TeamType,
} from 'shared/components/autocomplete/team-type-auto-complete'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'

const UserList = () => {
  const {
    handleOpenEdit,
    openEdit,
    rowId,
    rowData,
    setOpenEdit,
    handleOpenDetail,
    openDetail,
    setOpenDetail,
  } = useActionTable()
  const { useSearchListReturn, useFilterReturn } = useFilterUser()
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn

  const filters = _.omit(dataFilterWithValue, ['team_type'])
  const { useTableReturn } = useUserTable({
    search,
    filters,
  })
  const { actions } = useBuildActionsTableUser({
    handleOpenEdit,
    handleOpenDetail,
  })
  const { columnTable } = useBuildColumnTable<User>({
    actions: actions,
    columns,
    handleOpenDetail,
  })

  console.log('dataFilterWithValue', dataFilterWithValue)
  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Users'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <FlexBox>
            <ControllerFilter
              control={controlFilter}
              title="Role"
              keyName={'role_id'}
              Node={({ onFilter, value }) => (
                <RoleTemplateAutoComplete
                  multiple={true}
                  value={value}
                  name={'role_id'}
                  onCustomChange={(data) =>
                    onFilter(
                      data.map((value) => ({
                        label: value.name,
                        value: value.id,
                      }))
                    )
                  }
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Role',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Team type"
              keyName={'team_type'}
              Node={({ onFilter, value }) => (
                <TeamTypeAutoComplete
                  value={value}
                  multiple={false}
                  open={true}
                  disableCloseOnSelect={true}
                  onChange={(data) => onFilter(data)}
                  textFieldProps={{
                    label: 'Team type',
                    autoFocus: true,
                  }}
                />
              )}
            />
            {dataFilterWithValue.team_type !== TeamType.REC_TEAM && (
              <ControllerFilter
                control={controlFilter}
                title="Hiring team"
                keyName={'hiring_team_id'}
                Node={({ onFilter, value }) => (
                  <TeamsAutoComplete
                    value={value}
                    name="team"
                    multiple={true}
                    open={true}
                    disableCloseOnSelect={true}
                    onCustomChange={(data) =>
                      onFilter(
                        data.map((value) => ({
                          label: value.name,
                          value: value.id,
                        }))
                      )
                    }
                    textFieldProps={{
                      label: 'Hiring team',
                      autoFocus: true,
                    }}
                  />
                )}
              />
            )}

            {dataFilterWithValue.team_type !== TeamType.HIRING_TEAM && (
              <ControllerFilter
                control={controlFilter}
                title="REC team"
                keyName={'rec_team_ids'}
                Node={({ onFilter, value }) => (
                  <RecTeamsAutoComplete
                    value={value}
                    name="rec_team_id"
                    multiple={true}
                    open={true}
                    disableCloseOnSelect={true}
                    onCustomChange={(data) =>
                      onFilter(
                        data.map((value) => ({
                          label: value.name,
                          value: value.id,
                        }))
                      )
                    }
                    textFieldProps={{
                      label: 'REC team',
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
              placeholder="Search by name, email"
              onSearch={handleSearch}
            />
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          {useTableReturn && (
            <CustomTable
              columns={columnTable}
              useTableReturn={useTableReturn}
            />
          )}
        </Box>
      </BoxWrapperOuterContainer>
      {openEdit && (
        <EditHiringModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
          rowData={rowData.current}
        />
      )}
      {openDetail && (
        <DetailHiringModal
          open={openDetail}
          setOpen={setOpenDetail}
          id={rowId.current}
          rowData={rowData.current}
          handleOpenEdit={handleOpenEdit}
        />
      )}
    </Box>
  )
}

export default UserList
