import { Box } from '@mui/system'
import { columns } from '../../../shared/constants/columns'
import Add from 'shared/components/icons/Add'
import useTextTranslation from 'shared/constants/text'
import { BoxWrapperOuterContainer, HeadingWrapper } from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useActionTable from '../../../hooks/table/useActionTable'
import useJobTable from '../../../hooks/table/useJobTable'
import { DivHeaderWrapper } from '../../../shared/styles'
import CreateJobModal from '../CreateJobModal'
import EditJobModal from '../EditJobModal'
import DeleteJobModal from '../DeleteJobModal'
import { CloseJobModal } from '..'
import useFilterJobs from '../../../hooks/table/useFilterJobs'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import { Fragment } from 'react/jsx-runtime'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import Cant from 'features/authorization/presentation/components/Cant'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import useBuildAllJobsActionsTable from '../../../hooks/table/useAllJobsPermissionActionTable'
import TeamsFilterPermission from 'features/jobs/permission/filters/TeamsFilterPermission'

const AllJob = () => {
  const {
    openCreate,
    setOpenCreate,
    handleOpenEdit,
    openEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    rowId,
    setOpenEdit,
  } = useActionTable()

  const { useFilterReturn, useSearchListReturn } = useFilterJobs()
  const { dataFilterWithValue, controlFilter } = useFilterReturn
  const { search, searchRef, handleSearch } = useSearchListReturn
  const { useTableReturn } = useJobTable({
    filters: dataFilterWithValue,
    search: search,
  })

  const translation = useTextTranslation()

  const { actions } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenEdit,
    handleOpenStatus,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns,
  })

  return (
    <Fragment>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <FlexBox>
            <Cant
              module="TEAMS"
              checkBy={{
                compare: 'hasAny',
                permissions: [
                  'VIEW.everything',
                  'VIEW.teamOnly',
                  'VIEW.ownedOnly',
                ],
              }}
            >
              <ControllerFilter
                control={controlFilter}
                title="Team"
                keyName={'team_ids'}
                Node={({ onFilter, value }) => (
                  <TeamsFilterPermission
                    value={value}
                    onCustomChange={(data) =>
                      onFilter(
                        data.map((value) => ({
                          label: value.name,
                          value: value.id,
                        }))
                      )
                    }
                  />
                )}
              />
            </Cant>
            <ControllerFilter
              control={controlFilter}
              title="Status"
              keyName={'status'}
              Node={({ onFilter, value }) => (
                <StatusJobAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => onFilter(data)}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Status',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Priority"
              keyName={'priority'}
              Node={({ onFilter, value }) => (
                <PriorityAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => onFilter(data)}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Priority',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Skill"
              keyName={'skill_ids'}
              Node={({ onFilter, value }) => (
                <SkillAutoComplete
                  name="skill"
                  multiple={true}
                  value={value}
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
                    label: 'Skill',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Location"
              keyName={'location'}
              Node={({ onFilter, value }) => (
                <LocationAutoComplete
                  multiple={false}
                  value={value}
                  onChange={(data) => onFilter(data)}
                  open={true}
                  disableCloseOnSelect={true}
                  textFieldProps={{
                    label: 'Location',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Requester"
              keyName={'created_by_ids'}
              Node={({ onFilter, value }) => (
                <InterViewerAutoComplete
                  name="requester"
                  multiple={true}
                  value={value}
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
                    label: 'Requester',
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
              placeholder="Search by Job title"
              onSearch={handleSearch}
            />
            <Cant
              checkBy={{
                compare: 'hasAny',
                permissions: ['CREATE.everything', 'CREATE.teamOnly'],
              }}
              module="JOBS"
            >
              <ButtonAdd
                Icon={Add}
                textLable={translation.MODLUE_JOBS.add_a_new_job}
                onClick={() => setOpenCreate(true)}
              />
            </Cant>
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

      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}
      {openEdit && (
        <EditJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          id={rowId.current}
        />
      )}

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}

      {openStatus && (
        <CloseJobModal
          open={openStatus}
          setOpen={setOpenStatus}
          id={rowId.current}
        />
      )}
    </Fragment>
  )
}

export default AllJob
