import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

type User = {
  id: string
  name: string
  work_email: number
  hiring_team_id: string
  rec_team_id: string
}

function UserAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<User, Multiple>) {
  const { getAllUser, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<User, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllUser}
      keyName="work_email"
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      name={name}
      {...other}
    />
  )
}

export default UserAutoComplete
