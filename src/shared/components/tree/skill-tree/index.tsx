import Box from '@mui/material/Box'
import useGetSkillType from './hook/useGetSkillType'
import AccordionComponent from './components/AccordionComponent'
import _, { cloneDeep, isEmpty } from 'lodash'
import { isExistKey, transformSkillRecord, updateListChild } from './utils'
import { Fragment } from 'react/jsx-runtime'
import PopperWrapper from './components/PoperComponent'
import FlexBox from 'shared/components/flexbox/FlexBox'
import SearchInput from 'shared/components/table/components/SearchInput'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { ChipSkill, SkillContainerWrapper } from './style'
import { TextFieldProps } from '@mui/material'
import { Skill } from 'features/skill/domain/interfaces'

export type TYPE_LIST_SELECTED = {
  id: string
  skill_id: string
  skill_name: string
  parent_id: string
}

export type SELECTED_SKILL = {
  [key: string]: TYPE_LIST_SELECTED[]
}

interface Props {
  value: SELECTED_SKILL
  onChange: (data: SELECTED_SKILL) => void
  textFieldProps?: TextFieldProps
}

export default function SkillTree({
  value,
  onChange,
  textFieldProps = { variant: 'outlined', label: 'Candidate skills' },
}: Props) {
  const { options, actions, searchRef } = useGetSkillType()
  const { handleSearch, handleReset } = actions

  const [skills, setSkills] = useState<TYPE_LIST_SELECTED[]>([])

  const handleOnChange = (data: TYPE_LIST_SELECTED) => {
    const { parent_id, skill_id } = data
    let parent_data = cloneDeep(value)?.[parent_id] ?? []
    parent_data = updateListChild(parent_data, skill_id, data)

    const newData = { ...value, [parent_id]: parent_data }
    onChange(newData)
  }

  const handleChangeParent = (data: { id: string, skills: Skill[] }) => {
    const { id, skills } = data

    const list_select = cloneDeep(value)
    const exist_parent = isExistKey(id, value)
    const skill_list = skills.map((skill) => ({id: '', parent_id: id, skill_id: skill.id, skill_name: skill.name}))
    if (!exist_parent) {
      list_select[id] = skill_list
    } else {
      delete list_select[id]
    }
    onChange(list_select)
  }

  useEffect(() => {
    if (typeof value === 'object') {
      const data = transformSkillRecord(value)
      setSkills(data)
    }
  }, [value])

  return (
    <Fragment>
      <PopperWrapper
        inputLabel="candidate skill"
        textFieldProps={textFieldProps}
        tag={skills.map((skill) => (
          <ChipSkill
            key={skill.skill_id}
            label={skill.skill_name}
            onDelete={() => handleOnChange(skill)}
            size="small"
          />
        ))}
        node={
          <SkillContainerWrapper>
            <FlexBox
              sx={{
                padding: '12px 16px',
                backgroundColor: '#F1F9FF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <SearchInput
                ref={searchRef}
                onEnter={handleSearch}
                placeholder="Search"
                onSearch={handleSearch}
              />
              <CloseIcon
                sx={{ fontSize: '16px', color: '#0000008A' }}
                onClick={handleReset}
              />
            </FlexBox>
            <Box>
              {options.map((skill_type) => {
                return (
                  <AccordionComponent
                    onChange={handleOnChange}
                    skill_type={skill_type}
                    selected={value}
                    handleChangeParent={handleChangeParent}
                  />
                )
              })}
            </Box>
          </SkillContainerWrapper>
        }
      />
    </Fragment>
  )
}
