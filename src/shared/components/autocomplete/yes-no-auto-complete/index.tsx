import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function YesNoAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const options: IOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

export default YesNoAutoComplete
