import { DivFilter, DivHeaderWrapper } from 'features/candidates/shared/styles'
import { Fragment } from 'react'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import useActionTable from '../../../../hooks/table/useActionTable'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ApplyJobModal from '../../ApplyJobCandidate'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import SearchInput from 'shared/components/table/components/SearchInput'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import ListBullIcon from 'shared/components/icons/ListBullIcon'
import ListShellIcon from 'shared/components/icons/ListShellIcon'
import ControllerFilterWrapper from 'shared/components/table/components/tooltip-filter/ControllerFilterWrapper'
import { OPENING_PAGE_APPLICATION } from 'features/application/shared/constants'
import { sxIconSelected } from '../styles'
import RecTeamsAutoComplete from 'shared/components/autocomplete/rec-team-auto-complete'
import CandidateStatusAutoComplete from 'shared/components/autocomplete/candidate-status-auto-complete'
import LevelAutoComplete from 'shared/components/autocomplete/level-auto-complete'
import Cant from 'features/authorization/presentation/components/Cant'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const FilterCandidate = () => {
  const { openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { actions, action_filter } = useContextChangeStatus()
  const { handleAddCandidate } = actions
  const { useFilterReturn, useSearchListReturn } = action_filter
  const { searchRef, handleSearch } = useSearchListReturn
  const { controlFilter } = useFilterReturn

  const queryClient = useQueryClient()
  const handleRefreshList = () => {
    queryClient.invalidateQueries({
      queryKey: [MODLUE_QUERY_KEY.CANDIDATE_JOB],
    })
  }

  return (
    <Fragment>
      <FlexBox width={'100%'} justifyContent={'space-between'}>
        <DivFilter>
          <ControllerFilter
            control={controlFilter}
            title="Job request"
            keyName={'hiring_job_ids'}
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

          <ControllerFilter
            control={controlFilter}
            title="Hiring team"
            keyName={'hiring_team_ids'}
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
            title="REC team"
            keyName={'rec_id'}
            Node={({ onFilter, value }) => (
              <RecTeamsAutoComplete
                name="rec_id"
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
                  label: 'REC team',
                  autoFocus: true,
                }}
              />
            )}
          />
          <ControllerFilter
            control={controlFilter}
            keyName="status"
            title="Status"
            Node={({ onFilter, value }) => (
              <CandidateStatusAutoComplete
                multiple={false}
                value={value}
                onChange={(data) => {
                  onFilter(data)
                }}
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
            title="Level"
            keyName={'levels'}
            Node={({ onFilter, value }) => (
              <LevelAutoComplete
                multiple={true}
                value={value}
                onChange={(data) => {
                  onFilter(data)
                }}
                open={true}
                disableCloseOnSelect={true}
                textFieldProps={{
                  label: 'Level',
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
              const sx = sxIconSelected(value === OPENING_PAGE_APPLICATION.list_candidate)

              return (
                <ListBullIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Opening job',
                      value: OPENING_PAGE_APPLICATION.list_candidate,
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
                value === OPENING_PAGE_APPLICATION.kanban
              )

              return (
                <ListShellIcon
                  sx={{ ...sx }}
                  onClick={() => {
                    onFilter({
                      label: 'Candidate job',
                      value: OPENING_PAGE_APPLICATION.kanban,
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
          placeholder="Search by name, email"
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
        </FlexBox>
      </DivHeaderWrapper>

      {openCreateApply && (
        <ApplyJobModal
          open={openCreateApply}
          setOpen={setOpenCreateApply}
          onSuccess={(data) => {
            handleRefreshList()
            handleAddCandidate(data)
          }}
        />
      )}
    </Fragment>
  )
}

export default FilterCandidate
