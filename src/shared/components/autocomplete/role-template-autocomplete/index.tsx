import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

export interface Role {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

type EntityPermission = {
  id: string
  for_owner: boolean
  for_team: boolean
  for_all: boolean
  permission: Permission
}

type Permission = {
  id: string
}

function RoleTemplateAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<Role, Multiple>) {
  const { getAllUsers, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Role, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllUsers}
      keyName="name"
      name={name}
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      orderBy={{
        direction: 'DESC',
        field: 'name',
      }}
      {...other}
    />
  )
}

export default RoleTemplateAutoComplete
