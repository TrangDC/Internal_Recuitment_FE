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
    Intern: {label: "Intern", value: "Intern"},
    Fresher : {label: "Fresher ", value: "Fresher "},
    Junior : {label: "Junior ", value: "Junior "},
    Middle : {label: "Middle ", value: "Middle "},
    Senior: {label: "Senior", value: "Senior"},
    Manager: {label: "Manager", value: "Manager"},
    Director: {label: "Director", value: "Director"},
}

const options: IOption[] = [
  {label: LEVEL_STATE.Intern.label, value: LEVEL_STATE.Intern.value},
  {label: LEVEL_STATE.Fresher.label, value: LEVEL_STATE.Fresher.value},
  {label: LEVEL_STATE.Junior.label, value: LEVEL_STATE.Junior.value},
  {label: LEVEL_STATE.Middle.label, value: LEVEL_STATE.Middle.value},
  {label: LEVEL_STATE.Senior.label, value: LEVEL_STATE.Senior.value},
  {label: LEVEL_STATE.Manager.label, value: LEVEL_STATE.Manager.value},
  {label: LEVEL_STATE.Director.label, value: LEVEL_STATE.Director.value},
]

// export const PRIORITY_DATA = {
//   1: {label: 'Urgent', backgroundColor: "#E50000", color: '#FFFFFF'},
//   2: {label: 'High', backgroundColor: "#FC105C", color: '#FFFFFF'},
//   3: {label: 'Medium', backgroundColor: "#FFAF46", color: '#FFFFFF'},
//   4: {label: 'Low', backgroundColor: "#5CBAFE", color: '#FFFFFF'},
// }

export default LevelAutoComplete