import { AutocompleteValueBackEndCommonProps } from 'shared/components/autocomplete/autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'
import { AutocompleteBaseBackEnd } from 'shared/components/autocomplete/autocomplete-base-back-end'
import Role from 'shared/schema/database/role'

function RoleTemplateSelection<Multiple extends boolean>({
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

export default RoleTemplateSelection
