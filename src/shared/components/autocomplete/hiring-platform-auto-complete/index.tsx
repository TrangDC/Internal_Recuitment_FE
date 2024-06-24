import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function HiringPlatformAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const REC_STATE = {
    TOPCV: 'topcv',
    VIETNAM_WORKS: 'vietnam_works',
    ITVIEC: 'itviec',
}

export const HIRING_PLATFORM_LABEL = {
  topcv: 'TopCV',
  vietnam_works: 'VietnamWorks',
  itviec: 'ITviec',
}

const options: IOption[] = [
  {label: 'TopCV', value: REC_STATE.TOPCV},
  {label: 'VietnamWorks', value: REC_STATE.VIETNAM_WORKS},
  {label: 'ITviec', value: REC_STATE.ITVIEC},
]

export default HiringPlatformAutoComplete