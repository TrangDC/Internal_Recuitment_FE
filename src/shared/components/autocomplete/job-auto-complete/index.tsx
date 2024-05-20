import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface Jobs {
  name: string
  id: string
}

function JobsAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
}: AutocompleteValueBackEndCommonProps<Jobs, Multiple>) {
  const { getAllHiringJobs, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Jobs, 'id', 'name', Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllHiringJobs}
      keyName="name"
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      seletedKey={'id'}
      textFieldProps={textFieldProps}
    />
  )
}

export default JobsAutoComplete
