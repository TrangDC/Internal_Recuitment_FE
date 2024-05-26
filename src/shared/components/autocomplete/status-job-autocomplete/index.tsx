import { STATUS_STATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function StatusJobAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options: IOption[] = [
  { label: 'Opening', value:  STATUS_STATE.OPENED },
  { label: 'Closed', value: STATUS_STATE.CLOSED },
]

export default StatusJobAutoComplete
