import { DivFilter, DivHeaderWrapper } from 'features/candidates/shared/styles'
import { Fragment, useMemo } from 'react'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
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
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import ListBullIcon from 'shared/components/icons/ListBullIcon'
import ListShellIcon from 'shared/components/icons/ListShellIcon'
import ControllerFilterWrapper from 'shared/components/table/components/tooltip-filter/ControllerFilterWrapper'
import { OPENING_PAGE_JOB } from 'features/jobs/shared/constants'
import { sxIconSelected } from '../styles'

const FilterCandidate = () => {
  const translation = useTextTranslation()

  const { openCreate, setOpenCreate, openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { actions, action_filter } = useContextChangeStatus()
  const { handleAddCandidate } = actions
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { searchRef, handleSearch } = useSearchListReturn

  const { dataFilterWithValue, controlFilter } = useFilterReturn

  const show_filter_job = useMemo(() => {
    return dataFilterWithValue.page_job === OPENING_PAGE_JOB.candidate_job
  }, [dataFilterWithValue.page_job])

  return (
    <Fragment>
      <FlexBox width={'100%'} justifyContent={'space-between'}>
        <DivFilter>
          {show_filter_job && (
            <ControllerFilter
              control={controlFilter}
              title="Job"
              keyName={'hiring_job_id'}
              Node={({ onFilter, value }) => (
                <JobsAutoComplete
                  name="job"
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
                    label: 'Job',
                    autoFocus: true,
                  }}
                />
              )}
            />
          )}

          <ControllerFilter
            control={controlFilter}
            title="Hiring team"
            keyName={'hiring_team_id'}
            Node={({ onFilter, value }) => (
              <TeamsAutoComplete
                name="team"
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
                  label: 'Team',
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
            keyName={'skill_id'}
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
              const sx = sxIconSelected(value === OPENING_PAGE_JOB.list_job)

              return (
                <ListBullIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Opening job',
                      value: OPENING_PAGE_JOB.list_job,
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
              const sx = sxIconSelected(
                value === OPENING_PAGE_JOB.candidate_job
              )

              return (
                <ListShellIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Candidate job',
                      value: OPENING_PAGE_JOB.candidate_job,
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
          placeholder="Search by Job title"
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
              <Span>Apply candidate to a job</Span>
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
              onClick={() => setOpenCreate(true)}
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
          onSuccess={handleAddCandidate}
        />
      )}
    </Fragment>
  )
}

export default FilterCandidate
