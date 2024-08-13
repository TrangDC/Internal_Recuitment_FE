import { CandidateGenderEnum } from 'shared/schema/database/candidate'
import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function GenderAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const options: IOption[] = [
  { label: 'Male', value: CandidateGenderEnum.MALE },
  { label: 'Female', value: CandidateGenderEnum.FEMALE },
  { label: 'Other', value: CandidateGenderEnum.OTHERS },
]

export default GenderAutoComplete
