import { SALARY_STATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function SalaryTypeAutoComponent<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options: IOption[] = [
  {label: 'Range', value: SALARY_STATE.RANGE},
  {label: 'Up to', value: SALARY_STATE.UP_TO},
  {label: 'Minimum', value: SALARY_STATE.MINIMUM},
  {label: 'Negotitation', value: SALARY_STATE.NEGOTITATION},
]

export default SalaryTypeAutoComponent