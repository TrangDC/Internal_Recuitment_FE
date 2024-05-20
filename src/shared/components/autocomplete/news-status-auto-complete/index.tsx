import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function NewsStatusAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const options: IOption[] = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Hidden', value: 'hidden' },
]

export default NewsStatusAutoComplete
