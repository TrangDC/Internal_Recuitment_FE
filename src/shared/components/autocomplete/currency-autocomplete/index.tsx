import { CURRENCY_STATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function CurrencyAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options: IOption[] = [
  {label: 'VND', value: CURRENCY_STATE.VND},
  {label: 'USD', value: CURRENCY_STATE.USD},
  {label: 'JPY', value: CURRENCY_STATE.JPY},
]

export default CurrencyAutoComplete