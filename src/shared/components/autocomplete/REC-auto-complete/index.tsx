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

export const REC_SOURCE_LABEL = {
  linkedin: 'Linkedin',
  facebook: 'Facebook',
  instagram: 'Instagram',
  thread: 'Theard',
  github: 'Github',
  others: 'Others',
}

const options: IOption[] = [
  {label: 'Linkedin', value: REC_STATE.LINKEDIN},
  {label: 'Facebook', value: REC_STATE.FACEBOOK},
  {label: 'Instagram', value: REC_STATE.INSTAGRAM},
  {label: 'Theard', value: REC_STATE.THREAD},
  {label: 'Github', value: REC_STATE.GITHUB},
  {label: 'Others', value: REC_STATE.OTHERS},
]

export default RECAutoComplete