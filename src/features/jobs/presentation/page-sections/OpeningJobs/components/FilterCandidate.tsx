import { IconButton, InputAdornment } from '@mui/material'
import {
  DivFilter,
  DivHeaderWrapper,
} from 'features/candidates/presentation/providers/styles'
import {
  Fragment,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react'
import { CustomTextField } from 'shared/components/form/styles'
import SearchIcon from 'shared/components/icons/SearchIcon'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import _ from 'lodash'
import useTextTranslation from 'shared/constants/text'
import { Add } from '@mui/icons-material'
import useActionTable from '../../../providers/hooks/useActionTable'
import CreateJobModal from '../../CreateJobModal'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ApplyJobModal from '../../ApplyJobCandidate'
import useFilterJobsOpening from 'features/jobs/presentation/providers/hooks/useFilterJobsOpening'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import TeamsAutoComplete from 'shared/components/autocomplete/team-auto-complete'
import JobsAutoComplete from 'shared/components/autocomplete/job-auto-complete'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import { BaseRecord } from 'shared/interfaces'
import { removeEmptyInObject } from 'shared/utils/utils'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'

const FilterCandidate = () => {
  const translation = useTextTranslation()
  const [searchField, setSearchField] = useState('')
  const [filter, setFilter] = useState<BaseRecord>({})

  const { openCreate, setOpenCreate, openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { handleFilter, handleFreeWord, handleAddCandidate } =
    useContextChangeStatus()

  const handleFreeWorld: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.keyCode === 13) {
      handleFreeWord({
        job_title: searchField,
      })
    }
  }

  const { useFilterReturn } = useFilterJobsOpening()
  const { dataFilterWithValue, controlFilter } = useFilterReturn

  useEffect(() => {
    if (!_.isEqual(filter, dataFilterWithValue)) {
      setFilter(dataFilterWithValue)
      handleFilter({
        ...removeEmptyInObject(dataFilterWithValue),
      })
    }
  }, [dataFilterWithValue])

  return (
    <Fragment>
      <DivFilter>
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

        <ControllerFilter
          control={controlFilter}
          title="Team"
          keyName={'team_id'}
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
        <CustomTextField
          id="outlined-basic"
          label={'Search by Job title'}
          variant="outlined"
          size="small"
          sx={{ width: '400px', fontSize: '13px' }}
          onKeyUp={handleFreeWorld}
          onChange={(e) => setSearchField(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon
                    sx={{ fontSize: '16px' }}
                    onClick={() => {
                      handleFreeWord({
                        job_title: searchField,
                      })
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FlexBox gap={1} alignItems={'center'}>
          <BtnPrimary onClick={() => setOpenCreateApply(true)}>
            <Span>Apply candidate to a job</Span>
          </BtnPrimary>
          <ButtonAdd
            Icon={Add}
            textLable={translation.MODLUE_JOBS.add_a_new_job}
            onClick={() => setOpenCreate(true)}
          />
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