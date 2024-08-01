import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

type JobPosition = {
  id: string
  name: string
}

function JobPositionAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<JobPosition, Multiple>) {
  const { getAllJobOptions, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<JobPosition, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllJobOptions}
      keyName="name"
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

export default JobPositionAutoComplete
