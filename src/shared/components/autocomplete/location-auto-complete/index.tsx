import { LOCATION_STATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function LocationAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options: IOption[] = [
  {label: 'Hà Nội', value: LOCATION_STATE.HA_NOI},
  {label: 'Đà Nẵng', value: LOCATION_STATE.DA_NANG},
  {label: 'Hồ Chí Minh', value: LOCATION_STATE.HO_CHI_MINH},
  {label: 'Japan', value: LOCATION_STATE.JAPAN},
]

export default LocationAutoComplete