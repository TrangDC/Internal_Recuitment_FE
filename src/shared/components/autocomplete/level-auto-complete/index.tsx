import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function LevelAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const LEVEL_STATE = {
  intern: { label: 'Intern', value: 'intern' },
  fresher: { label: 'Fresher ', value: 'fresher' },
  junior: { label: 'Junior ', value: 'junior' },
  middle: { label: 'Middle ', value: 'middle' },
  senior: { label: 'Senior', value: 'senior' },
  manager: { label: 'Manager', value: 'manager' },
  director: { label: 'Director', value: 'director' },
}

const options: IOption[] = [
  { label: LEVEL_STATE.intern.label, value: LEVEL_STATE.intern.value },
  { label: LEVEL_STATE.fresher.label, value: LEVEL_STATE.fresher.value },
  { label: LEVEL_STATE.junior    .label, value: LEVEL_STATE.junior    .value },
  { label: LEVEL_STATE.middle.label, value: LEVEL_STATE.middle.value },
  { label: LEVEL_STATE.senior.label, value: LEVEL_STATE.senior.value },
  { label: LEVEL_STATE.manager.label, value: LEVEL_STATE.manager.value },
  { label: LEVEL_STATE.director.label, value: LEVEL_STATE.director.value },
]

export default LevelAutoComplete
