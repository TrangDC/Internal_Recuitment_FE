import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function PriorityAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const PRIORITY_STATE = {
    URGENT: '1',
    HIGHT: '2',
    MEDIUM: '3',
    LOW: '4'
}

const options: IOption[] = [
  {label: 'Urgent', value: PRIORITY_STATE.URGENT},
  {label: 'High', value: PRIORITY_STATE.HIGHT},
  {label: 'Medium', value: PRIORITY_STATE.MEDIUM},
  {label: 'Low', value: PRIORITY_STATE.LOW},
]

export const PRIORITY_DATA = {
  1: {label: 'Urgent', backgroundColor: "#E50000", color: '#FFFFFF'},
  2: {label: 'High', backgroundColor: "#FC105C", color: '#FFFFFF'},
  3: {label: 'Medium', backgroundColor: "#FFAF46", color: '#FFFFFF'},
  4: {label: 'Low', backgroundColor: "#5CBAFE", color: '#FFFFFF'},
}

export default PriorityAutoComplete