import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface Teams {
  name: string
  id: string
}

function TeamsAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  filter,
  ...other
}: AutocompleteValueBackEndCommonProps<Teams, Multiple>) {
  const { getAllTeams, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Teams, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllTeams}
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

export default TeamsAutoComplete
