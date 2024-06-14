import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface Skill {
  name: string
  id: string
  description: string
}

function SkillAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  filter,
  ...other
}: AutocompleteValueBackEndCommonProps<Skill, Multiple>) {
  const { getAllSkill, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Skill, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllSkill}
      keyName="name"
      value={value}
      name={name}
      filter={filter}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      {...other}
    />
  )
}

export default SkillAutoComplete
