import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface InterViewer {
  name: string
  id: string
}

function InterViewerAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<InterViewer, Multiple>) {
  const { getAllUsers, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<InterViewer, Multiple>
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
      {...other}
    />
  )
}

export default InterViewerAutoComplete
