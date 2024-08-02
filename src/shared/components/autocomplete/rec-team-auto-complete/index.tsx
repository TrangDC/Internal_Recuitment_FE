import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

export interface RecTeamsAutoCompleteData {
  name: string
  id: string
}

function RecTeamsAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  filter,
  ...other
}: AutocompleteValueBackEndCommonProps<RecTeamsAutoCompleteData, Multiple>) {
  const { getAllRecTeams, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<RecTeamsAutoCompleteData, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllRecTeams}
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

export default RecTeamsAutoComplete
