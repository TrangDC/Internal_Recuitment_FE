import { H3, Tiny12md } from 'shared/components/Typography'
import { BoxCandidateInfor } from '../../components/Container'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { ChipLimit } from 'shared/components/chip-stack'
import { Divider } from '@mui/material'
import EntitySkillType from 'shared/schema/database/entity_skill_type'

type SkillsProps = {
  skills: EntitySkillType[]
}

function Skills({ skills }: SkillsProps) {
  return (
    <BoxCandidateInfor>
      <H3 sx={{ color: 'primary.800', fontWeight: 500 }} marginBottom={1}>
        Skills
      </H3>
      <FlexBox flexDirection={'column'}>
        {skills.map((skill, index) => (
          <FlexBox flexDirection={'column'} gap={1} key={skill.id}>
            <Tiny12md color={'#2A2E37'}>{skill.name}</Tiny12md>
            <ChipLimit
              chips={skill.entity_skills.map((i) => i.name)}
              limit={3}
            />
            {index !== skills.length - 1 && (
              <Divider
                sx={{
                  margin: '15px 0',
                }}
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            )}
          </FlexBox>
        ))}
      </FlexBox>
    </BoxCandidateInfor>
  )
}

export default Skills
