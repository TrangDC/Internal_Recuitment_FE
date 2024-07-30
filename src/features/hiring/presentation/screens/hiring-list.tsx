import { Box } from '@mui/system'
import IconScreen from 'shared/components/utils/IconScreen'
import HiringTeam from 'shared/components/icons/HiringTeams'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import { DivHeaderWrapper } from 'features/candidates/shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import EditHiringModal from '../screen-sections/EditHiringModal'
import { columns } from 'features/hiring/shared/constants/columns'
import useFilterHiringTeams from 'features/hiring/hooks/table/useFilterHiringTeams'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import RoleTemplateAutoComplete from 'shared/components/autocomplete/role-template-autocomplete'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import useActionTable from 'features/hiring/hooks/table/useActionTable'
import useHiringTable from 'features/hiring/hooks/table/useHiringTable'
import useBuildActionsTableHiringTeam from 'features/hiring/hooks/table/useBuildActionsTableHiringTeam'
import DetailHiringModal from '../screen-sections/DetailHiringModal'
import User from 'shared/schema/database/user'

const HiringList = () => {
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
  const { useSearchListReturn, useFilterReturn } = useFilterHiringTeams()
  const { controlFilter, dataFilterWithValue } = useFilterReturn
  const { handleSearch, search, searchRef } = useSearchListReturn
  const { useTableReturn } = useHiringTable({
    search,
    filters: dataFilterWithValue,
  })
  const { actions } = useBuildActionsTableHiringTeam({
    handleOpenEdit,
    handleOpenDetail,
  })
  const { columnTable } = useBuildColumnTable<User>({
    actions: actions,
    columns,
  })
  return (
    <Box pt={2} pb={4}>
      <IconScreen Icon={HiringTeam} textLable={'Hiring Team'} />
      <BoxWrapperOuterContainer>
        <HeadingWrapper>
          <FlexBox>
            <ControllerFilter
              control={controlFilter}
              title="Team"
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
                    label: 'Team',
                    autoFocus: true,
                  }}
                />
              )}
            />
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

export default HiringList
