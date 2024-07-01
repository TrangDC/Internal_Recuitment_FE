import { SkillType } from 'features/skillType/domain/interfaces'
import {
  Box,
} from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny } from 'shared/components/Typography'
import Checkbox from '@mui/material/Checkbox'
import { useMemo } from 'react'
import { SELECTED_SKILL } from '..'
import { existChild, isExistKey } from '../utils'
import {
  AccordionBody,
  AccordionHeader,
  AccordionWrapper,
  FlexBoxBody,
} from '../style'
import DownIcon from 'shared/components/icons/DownIcon'
import { Skill } from 'features/skill/domain/interfaces'

type TYPE_LIST_SELECTED = {
  id: string
  skill_id: string
  skill_name: string
  parent_id: string
}

interface Props {
  skill_type: SkillType
  onChange: (data: TYPE_LIST_SELECTED) => void
  selected: SELECTED_SKILL
  handleChangeParent: ({ id }: { id: string, skills: Skill[] }) => void
}

const AccordionComponent = ({
  skill_type,
  onChange,
  selected,
  handleChangeParent,
}: Props) => {
  const { id, skills } = skill_type

  const child_checked = useMemo(() => {
    return selected?.[id] ?? []
  }, [selected])

  return (
    <AccordionWrapper>
      <AccordionHeader
        expandIcon={<DownIcon id='down_icon'/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <FlexBox width={'100%'} justifyContent={'space-between'}>
          <Tiny>{skill_type.name}</Tiny>
          <Box onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isExistKey(id, selected)}
              onChange={() => {
                handleChangeParent({
                  id: id,
                  skills,
                })
              }}
            />
          </Box>
        </FlexBox>
      </AccordionHeader>
      <AccordionBody sx={{ padding: 0 }}>
        <FlexBox flexDirection={'column'} gap={'2px'}>
          {skill_type.skills.map((skill) => {
            const checked = existChild(child_checked, skill.id) ?? false

            return (
              <FlexBoxBody
                key={skill.id}
                sx={{
                  backgroundColor: checked ? '#F0F1F8' : 'white',
                }}
                onClick={() => {
                  onChange({
                    id: '',
                    parent_id: id,
                    skill_id: skill.id,
                    skill_name: skill.name,
                  })
                }}
              >
                <Tiny>{skill.name}</Tiny>
                <Checkbox checked={checked} />
              </FlexBoxBody>
            )
          })}
        </FlexBox>
      </AccordionBody>
    </AccordionWrapper>
  )
}

export default AccordionComponent
