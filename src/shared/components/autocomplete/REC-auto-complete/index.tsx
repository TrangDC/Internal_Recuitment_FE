import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function RECAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const REC_STATE = {
    LINKEDIN: 'linkedin',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    THREAD: 'thread',
    GITHUB: 'github',
    OTHERS: 'others',
}

const options: IOption[] = [
  {label: 'Linkedin', value: REC_STATE.LINKEDIN},
  {label: 'Facebook', value: REC_STATE.FACEBOOK},
  {label: 'Instagram', value: REC_STATE.INSTAGRAM},
  {label: 'Theard', value: REC_STATE.INSTAGRAM},
  {label: 'Github', value: REC_STATE.THREAD},
  {label: 'Others', value: REC_STATE.OTHERS},
]

export default RECAutoComplete