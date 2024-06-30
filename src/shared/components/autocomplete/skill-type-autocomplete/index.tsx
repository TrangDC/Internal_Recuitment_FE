import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface SkillType {
  name: string
  id: string
}

function SkillTypeAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  filter,
  ...other
}: AutocompleteValueBackEndCommonProps<SkillType, Multiple>) {
  const { getAllSkillType, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<SkillType, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllSkillType}
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

export default SkillTypeAutoComplete
