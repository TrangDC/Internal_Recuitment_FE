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

export const options: IOption[] = [
  {label: 'Applied', value: STATUS_CANDIDATE.APPLIED},
  {label: 'Interviewing', value: STATUS_CANDIDATE.INTERVIEWING},
  {label: 'Offering', value: STATUS_CANDIDATE.OFFERING},
  {label: 'Hired', value: STATUS_CANDIDATE.HIRED},
  {label: 'Kiv', value: STATUS_CANDIDATE.KIV},
  {label: 'Offered lost', value: STATUS_CANDIDATE.OFFERED_LOST},
  {label: 'Ex-staff', value: STATUS_CANDIDATE.EX_STAFTT},
]

export default CandidateStatusAutoComplete
