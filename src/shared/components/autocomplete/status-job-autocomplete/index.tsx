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
  { label: 'Pending approvals', value: STATUS_HIRING_JOB.PENDING_APPROVALS },
  { label: 'Opening', value: STATUS_HIRING_JOB.OPENED },
  { label: 'Closed', value: STATUS_HIRING_JOB.CLOSED },
  { label: 'Cancelled', value: STATUS_HIRING_JOB.CANCELLED },
]

export default StatusJobAutoComplete
