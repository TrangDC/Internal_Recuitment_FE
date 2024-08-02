import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function TeamTypeAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export enum TeamType {
  HIRING_TEAM = 'hiring_team',
  REC_TEAM = 'rec_team',
  ALL = 'all',
}

const options: IOption[] = [
  { label: 'All', value: TeamType.ALL },
  { label: 'Hiring team', value: TeamType.HIRING_TEAM },
  { label: 'Rec team', value: TeamType.REC_TEAM },
]

export default TeamTypeAutoComplete
