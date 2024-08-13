import useAutoCompleteBackEnd from 'shared/components/autocomplete/autocomplete-base-back-end/useAutoCompleteBackEnd'
import FlexAutocompleteBase from 'shared/components/autocomplete/flex-auto-complete'
import Skill from 'shared/schema/database/skill'
import useGraphql from './useGraphql'

type SelectionSkillProps = {
  skillType: string
  onChange: (value: Skill[]) => void
  value: string[]
}

function SelectionSkill({ skillType, onChange, value }: SelectionSkillProps) {
  const { getAllSkill, queryKey } = useGraphql()
  const variables = skillType
    ? {
        filter: {
          skill_type_ids: [skillType],
        },
      }
    : {}
  const { options } = useAutoCompleteBackEnd<Skill>({
    queryKey: [queryKey, JSON.stringify(variables)],
    queryString: getAllSkill,
    variables,
  })
  return (
    <FlexAutocompleteBase
      options={options}
      multiple={true}
      onChange={(value) => {
        onChange(value)
      }}
      selectedKey={'id'}
      keyName="name"
      value={value}
      textFieldProps={{
        label: 'Skill',
        required: true,
      }}
    />
  )
}

export default SelectionSkill
