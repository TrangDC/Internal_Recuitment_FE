import { FormControl } from '@mui/material'
import { useCreateFormContext } from 'features/candidates/hooks/crud/useContext'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import FlexBox from 'shared/components/flexbox/FlexBox'
import HelperTextForm from 'shared/components/forms/HelperTextForm'
import Skill from 'shared/schema/database/skill'
import SkillType from 'shared/schema/database/skill_type'
import DeleteBox from '../DeleteBox'
import SelectionSkill from '../SelectionSkill/SelectionSkill'
import SelectionSkillType from '../SelectionSkillType/SelectionSkillType'

type SkillFieldProps = {
  index: number
  onDelete: () => void
  name: 'entity_skill_records'
}
function SkillField({ index, name, onDelete }: SkillFieldProps) {
  const [skillType, setSkillType] = useState('')
  const { control, setValue, resetField } = useCreateFormContext()
  function onSkillChange(data: Skill[]) {
    if (data[0]) {
      setValue(`${name}.${index}.skill_type_id`, data[0].skill_type.id, {
        shouldValidate: true,
      })
    }
  }

  function onSkillTypeChange(value: SkillType | null) {
    resetField(`${name}.${index}.skill_id`, { defaultValue: [] })
    if (value) {
      setSkillType(value.id)
    }
  }
  return (
    <FlexBox width={'100%'} gap={2} marginBottom={2}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={`${name}.${index}.skill_type_id`}
          render={({ field, fieldState }) => (
            <FlexBox flexDirection={'column'}>
              <SelectionSkillType
                value={field.value}
                onChange={(value) => {
                  field.onChange(value?.id)
                  onSkillTypeChange(value)
                }}
              />
              <HelperTextForm
                message={fieldState.error?.message}
              ></HelperTextForm>
            </FlexBox>
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={`${name}.${index}.skill_id`}
          render={({ field, fieldState }) => (
            <FlexBox flexDirection={'column'}>
              <SelectionSkill
                onChange={(value) => {
                  field.onChange(value?.map((o) => o.id))
                  onSkillChange(value)
                }}
                value={field.value}
                skillType={skillType}
              />
              <HelperTextForm
                message={fieldState.error?.message}
              ></HelperTextForm>
            </FlexBox>
          )}
        />
      </FormControl>
      <DeleteBox onClick={onDelete} />
    </FlexBox>
  )
}

export default SkillField
