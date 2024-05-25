import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'
import useGraphql from './useGraphql'

interface CandidateJobs {
  id: string
  candidate: Candidate
}

interface Candidate {
  name: string
  id: string
  email: string
  phone: string
}

function CandidateJobsAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
  textFieldProps,
  filter,
  name,
  ...other
}: AutocompleteValueBackEndCommonProps<CandidateJobs, Multiple>) {
  const { getAllCandidateJobs, queryKey } = useGraphql()
  return (
    <AutocompleteBaseBackEnd<CandidateJobs, Multiple>
      onChange={onChange}
      queryKey={[queryKey]}
      queryString={getAllCandidateJobs}
      keyName="candidate.id"
      name={name}
      value={value}
      filter={filter}
      multiple={multiple}
      onCustomChange={onCustomChange}
      selectedKey={'id'}
      textFieldProps={textFieldProps}
      {...other}
    />
  )
}

export default CandidateJobsAutoComplete
