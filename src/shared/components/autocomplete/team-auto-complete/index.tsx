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
}: AutocompleteValueBackEndCommonProps<Teams, Multiple>) {
  const { getAllTeams, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Teams, 'id', 'name', Multiple>
      name={name}
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllTeams}
      keyName="name"
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      seletedKey={'id'}
      textFieldProps={textFieldProps}
    />
  )
}

export default TeamsAutoComplete
