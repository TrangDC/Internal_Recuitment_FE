import { DivFilter, DivHeaderWrapper } from 'features/candidates/shared/styles'
import { Fragment } from 'react'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useContextKanbanJob } from '../context/KanbanJobContext'
import useTextTranslation from 'shared/constants/text'
import { Add } from '@mui/icons-material'
import useActionTable from '../../../../hooks/table/useActionTable'
import CreateJobModal from '../../CreateJobModal'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ApplyJobModal from '../../ApplyJobCandidate'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import Cant from 'features/authorization/presentation/components/Cant'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import ListBullIcon from 'shared/components/icons/ListBullIcon'
import ListShellIcon from 'shared/components/icons/ListShellIcon'
import ControllerFilterWrapper from 'shared/components/table/components/tooltip-filter/ControllerFilterWrapper'
import { VIEW_PAGE_JOB } from 'features/jobs/shared/constants'
import { sxIconSelected } from '../styles'
import { useNavigate } from 'react-router-dom'
import JobPositionAutoComplete from 'shared/components/autocomplete/job-position-auto-complete'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import StatusJobAutoComplete from 'shared/components/autocomplete/status-job-autocomplete'
import RecInChargeAutoComplete from 'shared/components/autocomplete/rec-in-charge-auto-complete'

const FilterCandidate = () => {
  const translation = useTextTranslation()

  const { openCreate, setOpenCreate, openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { action_filter, actions } = useContextKanbanJob()
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { refetch } = actions
  const { searchRef, handleSearch } = useSearchListReturn

  const { controlFilter } = useFilterReturn

  const navigate = useNavigate()

  return (
    <Fragment>
      <FlexBox width={'100%'} justifyContent={'space-between'}>
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
        <FlexBox gap={1}>
          <ControllerFilterWrapper
            control={controlFilter}
            keyName="page_job"
            Node={({ onFilter, value }) => {
              const sx = sxIconSelected(value === VIEW_PAGE_JOB.list_all_job)

              return (
                <ListBullIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Opening job',
                      value: VIEW_PAGE_JOB.list_all_job,
                    })
                  }}
                />
              )
            }}
          />

          <ControllerFilterWrapper
            control={controlFilter}
            keyName="page_job"
            Node={({ onFilter, value }) => {
              const sx = sxIconSelected(value === VIEW_PAGE_JOB.list_job_kanban)

              return (
                <ListShellIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Candidate job',
                      value: VIEW_PAGE_JOB.list_job_kanban,
                    })
                  }}
                />
              )
            }}
          />
        </FlexBox>
      </FlexBox>

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

      {openCreate && (
        <CreateJobModal open={openCreate} setOpen={setOpenCreate} />
      )}

      {openCreateApply && (
        <ApplyJobModal
          open={openCreateApply}
          setOpen={setOpenCreateApply}
          onSuccess={refetch}
        />
      )}
    </Fragment>
  )
}

export default FilterCandidate
