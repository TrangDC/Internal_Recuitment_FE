import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

interface Props {
  options?: IOption[]
}

function CandidateStatusAutoComplete<Multiple extends boolean>(
  {
    options = options_status,
    ...props
  }: IAutocompleteCommonProps<Multiple> & Props,
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options_status: IOption[] = [
  { label: 'Applied', value: STATUS_CANDIDATE.APPLIED },
  { label: 'Interviewing', value: STATUS_CANDIDATE.INTERVIEWING },
  { label: 'Offering', value: STATUS_CANDIDATE.OFFERING },
  { label: 'Hired', value: STATUS_CANDIDATE.HIRED },
  { label: 'KIV', value: STATUS_CANDIDATE.KIV },
  { label: 'Offered lost', value: STATUS_CANDIDATE.OFFERED_LOST },
  { label: 'Ex-staff', value: STATUS_CANDIDATE.EX_STAFTT },
]

export const options_status_new: IOption[] = [
  { label: 'New', value: STATUS_CANDIDATE.NEW },
  { label: 'Applied', value: STATUS_CANDIDATE.APPLIED },
  { label: 'Interviewing', value: STATUS_CANDIDATE.INTERVIEWING },
  { label: 'Offering', value: STATUS_CANDIDATE.OFFERING },
  { label: 'Hired', value: STATUS_CANDIDATE.HIRED },
  { label: 'KIV', value: STATUS_CANDIDATE.KIV },
  { label: 'Offered lost', value: STATUS_CANDIDATE.OFFERED_LOST },
  { label: 'Ex-staff', value: STATUS_CANDIDATE.EX_STAFTT },
]

export default CandidateStatusAutoComplete
