import useAutoCompleteBackEnd from 'shared/components/autocomplete/autocomplete-base-back-end/useAutoCompleteBackEnd'
import FlexAutocompleteBase from 'shared/components/autocomplete/flex-auto-complete'
import SkillType from 'shared/schema/database/skill_type'
import useGraphql from './useGraphql'

type SelectionSkillTypeProps = {
  onChange: (value: SkillType | null) => void
  value: string
}

function SelectionSkillType({ onChange, value }: SelectionSkillTypeProps) {
  const { getAllSkill, queryKey } = useGraphql()
  const { options } = useAutoCompleteBackEnd<SkillType>({
    queryKey: [queryKey],
    queryString: getAllSkill,
    variables: {},
  })
  return (
    <FlexAutocompleteBase
      options={options}
      multiple={false}
      onChange={(value) => {
        onChange(value)
      }}
      selectedKey={'id'}
      keyName="name"
      value={value}
      textFieldProps={{
        label: 'Skill type',
        required: true,
      }}
    />
  )
}

export default SelectionSkillType
