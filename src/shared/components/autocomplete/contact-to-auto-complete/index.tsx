import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'
import { CandidateHistoryCallTypeEnum } from '../../../schema/database/candidate_history_calls'
interface Props {
  options?: IOption[]
}

function ContactToAutoComplete<Multiple extends boolean>({
  options = options_status,
  ...props
}: IAutocompleteCommonProps<Multiple> & Props) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const options_status: IOption[] = [
  {
    label: 'Candidate',
    value: CandidateHistoryCallTypeEnum.CANDIDATE,
  },
  {
    label: 'Other',
    value: CandidateHistoryCallTypeEnum.OTHERS,
  },
]

export default ContactToAutoComplete
