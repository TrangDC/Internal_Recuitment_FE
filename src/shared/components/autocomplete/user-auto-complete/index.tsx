import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

type Member = {
  id: string
  name: string
  work_email: number
}

function MemberAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<Member, Multiple>) {
  const { getAllUser, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Member, Multiple>
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

export default MemberAutoComplete
