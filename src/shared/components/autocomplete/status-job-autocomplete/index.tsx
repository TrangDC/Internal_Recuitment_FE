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

const { STATUS_STATE } = JobStatus;

const options: IOption[] = [
  { label: 'Opening', value: STATUS_STATE.OPENED },
  { label: 'Closed', value: STATUS_STATE.CLOSED },
]

export default StatusJobAutoComplete
