import { Box } from '@mui/system'
import { columnsApproval } from '../../shared/constants/columns'
import {
  BoxWrapperOuterContainer,
  BtnPrimary,
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
import Cant from 'features/authorization/presentation/components/Cant'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useJobTable from 'features/jobs/hooks/table/useJobTable'
import useBuildAllJobsActionsTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import { DivFilter } from 'features/jobs/shared/styles'
import {
  CloseJobModal,
  CreateJobModal,
  DeleteJobModal,
  EditJobModal,
} from '../page-sections'
import IconScreen from 'shared/components/utils/IconScreen'
import MicroScope from 'shared/components/icons/Microscope'
import { Span, Tiny } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import Verify from 'shared/components/icons/Verify'
import RemoveBox from 'shared/components/icons/RemoveBox'
import useFilterMyApprovals from 'features/jobs/hooks/table/useFilterApproval'
import { JobStatus } from 'shared/class/job-status'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import JobPositionAutoComplete from 'shared/components/autocomplete/job-position-auto-complete'
import ApproveModal from '../page-sections/ApproveModal'

const MyApproval = () => {
  const {
    openCreate,
    setOpenCreate,
    openEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
    rowId,
    setOpenEdit,
    openApprove,
    openReject,
    setOpenApprove,
    setOpenReject,
    handleOpenApprove,
    handleOpenReject,
  } = useActionTable()

  const { useFilterReturn, useSearchListReturn } = useFilterMyApprovals()
  const { user } = useAuthorization()

  const { dataFilterWithValue, controlFilter } = useFilterReturn
  const { search, searchRef, handleSearch } = useSearchListReturn
  const { useTableReturn } = useJobTable({
    filters: {
      ...dataFilterWithValue,
      status: JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS,
      approver_id: user?.id,
      approver_status: 'pending',
    },
    search: search,
  })

  const { actions } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  })

  const { columnTable, rowSelected } = useBuildColumnTable({
    actions,
    columns: columnsApproval,
  })

  const disabledBtn = rowSelected.length === 0

  return (
    <Fragment>
      <Box>
        <IconScreen Icon={MicroScope} textLabel="My approvals" />
      </Box>
      <BoxWrapperOuterContainer sx={{ marginTop: 2.5 }}>
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
            <FlexBox gap={1} alignItems={'center'}>
              <Cant
                checkBy={{
                  compare: 'hasAny',
                  permissions: ['CREATE.everything', 'CREATE.teamOnly'],
                }}
                module="CANDIDATE_JOBS"
              >
                <BtnPrimary className={`${disabledBtn && 'disabled'}`}>
                  <RemoveBox sx={{ color: '#1F84EB', fontSize: '15px' }} />
                  <Span>Reject</Span>
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
                  Icon={Verify}
                  textLable="Approve"
                  disabled={disabledBtn}
                  onClick={() => {
                    handleOpenApprove()
                  }}
                />
              </Cant>
            </FlexBox>
          </DivHeaderWrapper>
          <FlexBox>
            <Tiny>{rowSelected.length} records selected</Tiny>
          </FlexBox>
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

      {/* {openCreate && (
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
      )} */}

      {openApprove && (
        <ApproveModal
          open={openApprove}
          setOpen={setOpenApprove}
          numberRecords={rowSelected.length}
          listRecord={rowSelected}
        />
      )}
    </Fragment>
  )
}

export default MyApproval