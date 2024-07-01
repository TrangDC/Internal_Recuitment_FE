import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import { transformListItem } from 'shared/utils/utils'
import { Member } from 'features/teams/domain/interfaces'
import InterViewerAutoComplete from '../autocomplete/interviewer-auto-complete'

interface Props {
  onChange: ({
    ids,
    value,
  }: {
    ids: string[]
    value: Pick<Member, 'name' | 'id'>[]
  }) => void
}

const RecruiterFilter = ({ onChange }: Props) => {
  const [recruiter, setRecruiter] = useState<Pick<Member, 'name' | 'id'>[]>([])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'By recruiter'}
        node={
          <InterViewerAutoComplete
            multiple={true}
            name="member"
            value={transformListItem(recruiter, 'id')}
            onChange={() => {}}
            onCustomChange={(data) => {
              const ids = data.map((item) => item.id)
              setRecruiter(data)

              onChange?.({ ids, value: data })
            }}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'By recruiter',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {recruiter.map((recruit, idx) => {
          return (
            <ChipField
              key={idx}
              label={recruit.name}
              onDelete={() => {
                const recruiterFilter = recruiter.filter((item) => item.id !== recruit.id)
                const ids = recruiterFilter.map((item) => item.id)
                setRecruiter(recruiterFilter)

                onChange?.({ ids, value: recruiterFilter })
              }}
            />
          )
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default RecruiterFilter
