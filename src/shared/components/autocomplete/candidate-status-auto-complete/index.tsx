import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function CandidateStatusAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const options: IOption[] = [
  {label: 'APPLIED', value: STATUS_CANDIDATE.APPLIED},
  {label: 'INTERVIEWING', value: STATUS_CANDIDATE.INTERVIEWING},
  {label: 'OFFERING', value: STATUS_CANDIDATE.OFFERING},
  {label: 'HIRED', value: STATUS_CANDIDATE.HIRED},
  {label: 'KIV', value: STATUS_CANDIDATE.KIV},
  {label: 'OFFERED LOST', value: STATUS_CANDIDATE.OFFERED_LOST},
  {label: 'EX-STAFTT', value: STATUS_CANDIDATE.EX_STAFTT},
]

export default CandidateStatusAutoComplete
