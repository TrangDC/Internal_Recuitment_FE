import { useState } from 'react'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import { transformListItem } from 'shared/utils/utils'
import SkillAutoComplete from '../autocomplete/skill-autocomplete'
import { Skill } from 'features/skill/domain/interfaces'

interface Props {
  onChange: ({
    ids,
    value,
  }: {
    ids: string[]
    value: Pick<Skill, 'name' | 'id'>[]
  }) => void
}

const SkillFilter = ({ onChange }: Props) => {
  const [skills, setSkills] = useState<Pick<Skill, 'name' | 'id'>[]>([])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Skill'}
        node={
          <SkillAutoComplete
            name="skill"
            multiple={true}
            value={transformListItem(skills, 'id')}
            onCustomChange={(data) => {
              const ids = data.map((item) => item.id)
              setSkills(data)

              onChange?.({ ids, value: data })
            }}
            onChange={() => {}}
            open={true}
            disableCloseOnSelect={true}
            textFieldProps={{
              label: 'Skill',
              autoFocus: true,
            }}
          />
        }
      />
      <FlexBox gap={'10px'}>
        {skills.map((skill, idx) => {
          return (
            <ChipField
              key={idx}
              label={skill.name}
              onDelete={() => {
                const skillFilter = skills.filter(
                  (item) => item.id !== skill.id
                )
                const ids = skillFilter.map((item) => item.id)
                setSkills(skillFilter)

                onChange?.({ ids, value: skillFilter })
              }}
            />
          )
        })}
      </FlexBox>
    </FlexBox>
  )
}

export default SkillFilter
