import Cant from 'features/authorization/presentation/components/Cant'
import { Fragment } from 'react'
import Add from 'shared/components/icons/Add'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import SearchInput from 'shared/components/table/components/SearchInput'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import {
  BoxWrapperOuterContainer,
  DivHeaderWrapper,
  HeadingWrapper,
} from 'shared/styles'
import { Box } from '@mui/system'
import useRecTeamTable from 'features/rec-team/hooks/table/useRecTeamTable'
import useFilterRecTeams from 'features/rec-team/hooks/table/useFilterRecTeams'
import { columns } from 'features/rec-team/shared/constants/columns'
import useBuildActionsTableRecTeam from 'features/rec-team/hooks/table/useBuildActionsTableRec'
import useActionTable from 'features/rec-team/hooks/table/useActionTable'
import CreateRecModal from '../page-sections/CreateRecModal'
import EditRecModal from '../page-sections/EditRecModal'
import DeleteRecModal from '../page-sections/DeleteRecModal'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'

function RecuitmentTeam() {
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
  const { useSearchListReturn, useFilterReturn } = useFilterRecTeams()
  const { search, handleSearch, searchRef } = useSearchListReturn
  const { controlFilter, dataFilterWithValue } = useFilterReturn

  const { actions } = useBuildActionsTableRecTeam(useActionTableReturn)
  const { columnTable } = useBuildColumnTable({
    columns,
    actions: actions,
  })
  const { useTableReturn } = useRecTeamTable({
    search,
    filters: dataFilterWithValue,
  })

  return (
    <Fragment>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox>
            <ControllerFilter
              control={controlFilter}
              title="Leader"
              keyName={'leader_ids'}
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
                  filter={{
                    is_able_to_leader_rec_team: false,
                  }}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Leader',
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
              placeholder="Search by Team's name"
              onSearch={handleSearch}
            />
            <Cant
              module={'REC_TEAMS'}
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
                textLable="Add a new REC team"
                onClick={() => setOpenCreate(true)}
              />
            </Cant>
          </DivHeaderWrapper>
        </HeadingWrapper>
        <Box>
          <CustomTable columns={columnTable} useTableReturn={useTableReturn} />
        </Box>
      </BoxWrapperOuterContainer>
      {openCreate && (
        <CreateRecModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditRecModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}
      {openDelete && (
        <DeleteRecModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}
    </Fragment>
  )
}

export default RecuitmentTeam
