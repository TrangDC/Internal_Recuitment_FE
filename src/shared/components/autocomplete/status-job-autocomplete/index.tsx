import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'
import { JobStatus } from 'shared/class/job-status'

function StatusJobAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const { STATUS_HIRING_JOB } = JobStatus;

const options: IOption[] = [
  { label: 'Opening', value: STATUS_HIRING_JOB.OPENED },
  { label: 'Closed', value: STATUS_HIRING_JOB.CLOSED },
]

export default StatusJobAutoComplete
