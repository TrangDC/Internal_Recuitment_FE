import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import { transformListItem } from 'shared/utils/utils'
import JobsAutoComplete from '../autocomplete/job-auto-complete'
import { Job } from 'features/jobs/domain/interfaces'

interface Props {
  onChange: ({
    ids,
    value,
  }: {
    ids: string[]
    value: Pick<Job, 'name' | 'id'>[]
  }) => void
}

const JobFilter = ({ onChange }: Props) => {
  const [jobs, setJobs] = useState<Pick<Job, 'name' | 'id'>[]>([])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Job'}
        node={
          <JobsAutoComplete
            name="job"
            multiple={true}
            value={transformListItem(jobs, 'id')}
            onCustomChange={(data) => {
              const ids = data.map((item) => item.id)
              setJobs(data)

              onChange?.({ ids, value: data })
            }}
            onChange={() => {}}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Job',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {jobs.map((skill, idx) => {
          return (
            <ChipField
              key={idx}
              label={skill.name}
              onDelete={() => {
                const jobFilter = jobs.filter(
                  (item) => item.id !== skill.id
                )
                const ids = jobFilter.map((item) => item.id)
                setJobs(jobFilter)

                onChange?.({ ids, value: jobFilter })
              }}
            />
          )
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default JobFilter
