import { DivFilter, DivHeaderWrapper } from 'features/candidates/shared/styles'
import { Fragment, useEffect, useRef, useState } from 'react'
import ButtonAdd from 'shared/components/utils/buttonAdd'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import _ from 'lodash'
import useTextTranslation from 'shared/constants/text'
import { Add } from '@mui/icons-material'
import useActionTable from '../../../../hooks/table/useActionTable'
import CreateJobModal from '../../CreateJobModal'
import { BtnPrimary } from 'shared/styles'
import { Span } from 'shared/components/Typography'
import FlexBox from 'shared/components/flexbox/FlexBox'
import ApplyJobModal from '../../ApplyJobCandidate'
import useFilterJobsOpening from 'features/jobs/hooks/table/useFilterJobsOpening'
import ControllerFilter from 'shared/components/table/components/tooltip-filter/ControllerFilter'
import PriorityAutoComplete from 'shared/components/autocomplete/priority-auto-complete'
import SkillAutoComplete from 'shared/components/autocomplete/skill-autocomplete'
import { BaseRecord } from 'shared/interfaces'
import { removeEmptyInObject } from 'shared/utils/utils'
import LocationAutoComplete from 'shared/components/autocomplete/location-auto-complete'
import InterViewerAutoComplete from 'shared/components/autocomplete/interviewer-auto-complete'
import SearchInput from 'shared/components/table/components/SearchInput'
import Cant from 'features/authorization/presentation/components/Cant'
import TeamsFilterPermission from 'features/jobs/permission/filters/TeamsFilterPermission'
import JobsFilterPermission from 'features/jobs/permission/filters/JobsFilterPermission'

const FilterCandidate = () => {
  const translation = useTextTranslation()
  const [filter, setFilter] = useState<BaseRecord>({})

  const searchRef = useRef<HTMLInputElement>(null)

  const { openCreate, setOpenCreate, openCreateApply, setOpenCreateApply } =
    useActionTable()
  const { actions } = useContextChangeStatus()
  const { handleFilter, handleFreeWord, handleAddCandidate } = actions

  const handleSearchFreeWorld = (value: string) => {
    handleFreeWord({
      job_title: value,
    })
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
            <JobsFilterPermission
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
        <Cant
          module="TEAMS"
          checkBy={{
            compare: 'hasAny',
            permissions: ['VIEW.everything', 'VIEW.teamOnly', 'VIEW.ownedOnly'],
          }}
        >
          <ControllerFilter
            control={controlFilter}
            title="Team"
            keyName={'team_id'}
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

      <DivHeaderWrapper>
        <SearchInput
          ref={searchRef}
          onEnter={(value) => {
            handleSearchFreeWorld(value)
          }}
          placeholder="Search by Job title"
          onSearch={() => {
            handleSearchFreeWorld(searchRef.current?.value as string)
          }}
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
