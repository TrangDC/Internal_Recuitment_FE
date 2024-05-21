import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface Candidate {
  name: string
  id: string
  email: string
  phone: string
}

function CandidateAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  name,
}: AutocompleteValueBackEndCommonProps<Candidate, Multiple>) {
  const { getAllCandidates, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<Candidate, 'id', 'name', Multiple>
      name={name}
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllCandidates}
      keyName="name"
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      seletedKey={'id'}
      textFieldProps={textFieldProps}
    />
  )
}

export default CandidateAutoComplete
