import { Box } from '@mui/system'
import { columns_pending_approvals } from '../../../shared/constants/columns'
import Add from 'shared/components/icons/Add'
import useTextTranslation from 'shared/constants/text'
import {
  BoxWrapperOuterContainer,
  BtnPrimary,
  HeadingWrapper,
} from 'shared/styles'
import { CustomTable, useBuildColumnTable } from 'shared/components/table'
import useActionTable from '../../../hooks/table/useActionTable'
import useJobTable from '../../../hooks/table/useJobTable'
import { DivFilter, DivHeaderWrapper } from '../../../shared/styles'
import DeleteJobModal from '../DeleteJobModal'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import { Fragment } from 'react/jsx-runtime'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import Cant from 'features/authorization/presentation/components/Cant'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import useBuildAllJobsActionsTable from '../../../hooks/table/useAllJobsPermissionActionTable'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import useFilterJobsPendingApproval from 'features/jobs/hooks/table/useFilterJobPendingApproval'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import JobPositionAutoComplete from 'shared/components/autocomplete/job-position-auto-complete'
import { JobStatus } from 'shared/class/job-status'
import CancelModal from '../CancelModal'
import ReopenJobModal from '../ReopenModal'
import CloseJobModal from '../CloseJobModal'
import { useNavigate } from 'react-router-dom'
import RecInChargeAutoComplete from 'shared/components/autocomplete/rec-in-charge-auto-complete'
import { REC_IN_CHARGE_STATE } from 'shared/components/autocomplete/rec-in-charge-auto-complete/hooks/useRecInCharge'
import { isEmpty } from 'lodash'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Span } from 'shared/components/Typography'
import ApplyJobModal from '../ApplyJobCandidate'

const PendingApprovals = () => {
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openCancel,
    setOpenCancel,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
    openClose,
    setOpenClose,
    openReopen,
    setOpenReopen,
    setOpenCreateApply,
    openCreateApply,
    rowId,
  } = useActionTable()

  const { useFilterReturn, useSearchListReturn } =
    useFilterJobsPendingApproval()
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
      status: JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS,
    },
    search: search,
  })
  const navigate = useNavigate()

  const translation = useTextTranslation()

  const { actions } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  })

  const { columnTable } = useBuildColumnTable({
    actions,
    columns: columns_pending_approvals,
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
              placeholder="Search by Job request name"
              onSearch={handleSearch}
            />
            <FlexBox gap={1} alignItems={'center'}>
              <Cant
                checkBy={{
                  compare: 'hasAny',
                  permissions: ['CREATE.everything', 'CREATE.teamOnly'],
                }}
                module="CANDIDATE_JOBS"
              >
                <BtnPrimary onClick={() => setOpenCreateApply(true)}>
                  <Span>Apply candidate</Span>
                </BtnPrimary>
              </Cant>

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
                  onClick={() => {
                    navigate('/dashboard/add-new-job-request')
                  }}
                />
              </Cant>
            </FlexBox>
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

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId.current}
        />
      )}

      {openClose && (
        <CloseJobModal
          open={openClose}
          setOpen={setOpenClose}
          id={rowId.current}
        />
      )}

      {openReopen && (
        <ReopenJobModal
          open={openReopen}
          setOpen={setOpenReopen}
          id={rowId.current}
        />
      )}

      {openCancel && (
        <CancelModal
          open={openCancel}
          setOpen={setOpenCancel}
          id={rowId.current}
        />
      )}

      {openCreateApply && (
        <ApplyJobModal open={openCreateApply} setOpen={setOpenCreateApply} />
      )}
    </Fragment>
  )
}

export default PendingApprovals
