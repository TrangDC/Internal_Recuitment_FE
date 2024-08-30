import { Box } from '@mui/system'
import {
  BoxWrapperOuterContainer,
  DivHeaderWrapper,
  HeadingWrapper,
} from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import { Fragment } from 'react/jsx-runtime'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import useBuildAllJobsActionsTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import { DivFilter } from 'features/jobs/shared/styles'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import JobPositionAutoComplete from 'shared/components/autocomplete/job-position-auto-complete'
import { columns_rejected_approvals } from 'features/jobs/shared/constants/columns'
import useFilterApprovalRejected from 'features/jobs/hooks/table/useFilterApprovalRejected'
import RecInChargeAutoComplete from 'shared/components/autocomplete/rec-in-charge-auto-complete'
import { REC_IN_CHARGE_STATE } from 'shared/components/autocomplete/rec-in-charge-auto-complete/hooks/useRecInCharge'
import { isEmpty } from 'lodash'

const ListApprovalRejected = () => {
  const {
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  } = useActionTable()

  const { useFilterReturn, useSearchListReturn } = useFilterApprovalRejected()
  const { user } = useAuthorization()

  const { dataFilterWithValue, controlFilter } = useFilterReturn
  const { search, searchRef, handleSearch } = useSearchListReturn
  const recInChargeIds =
    Array.isArray(dataFilterWithValue.rec_in_charge_ids) &&
    !isEmpty(dataFilterWithValue.rec_in_charge_ids)
      ? dataFilterWithValue.rec_in_charge_ids.filter(
          (recInCharge) => recInCharge !== REC_IN_CHARGE_STATE.has_rec_in_charge
        )
      : undefined

  const { useTableReturn } = useJobTable({
    filters: {
      ...dataFilterWithValue,
      rec_in_charge_ids: recInChargeIds,
      approver_id: user?.id,
      approver_status: 'rejected',
    },
    search: search,
  })

  const { actions } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns: columns_rejected_approvals,
  })

  return (
    <Fragment>
      <BoxWrapperOuterContainer sx={{ marginTop: 0 }}>
        <HeadingWrapper>
          <DivFilter>
            <ControllerFilter
              control={controlFilter}
              title="Hiring team"
              keyName={'hiring_team_ids'}
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
              title="REC team"
              keyName={'rec_team_ids'}
              Node={({ onFilter, value }) => (
                <RecTeamsAutoComplete
                  value={value}
                  name="rec_team_ids"
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
            <ControllerFilter
              control={controlFilter}
              title="REC in charge"
              keyName={'rec_in_charge_ids'}
              Node={({ onFilter, value }) => (
                <RecInChargeAutoComplete
                  value={value}
                  multiple={true}
                  open={true}
                  disableCloseOnSelect={true}
                  onChange={(data) => {
                    onFilter(data)
                  }}
                  textFieldProps={{
                    label: 'REC in charge',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Job position"
              keyName={'job_position_ids'}
              Node={({ onFilter, value }) => (
                <JobPositionAutoComplete
                  value={value}
                  name="job_position_ids"
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
                    label: 'Job position',
                    autoFocus: true,
                  }}
                />
              )}
            />
            <ControllerFilter
              control={controlFilter}
              title="Priority"
              keyName={'priorities'}
              Node={({ onFilter, value }) => (
                <PriorityAutoComplete
                  multiple={true}
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
          </DivFilter>
          <DivHeaderWrapper>
            <SearchInput
              ref={searchRef}
              onEnter={handleSearch}
              placeholder="Search by name"
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
    </Fragment>
  )
}

export default ListApprovalRejected
