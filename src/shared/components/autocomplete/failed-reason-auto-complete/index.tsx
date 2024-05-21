import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function FailedReasonAutoComplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

const options: IOption[] = [
  { label: 'Poor Professionalism', value: 'poor_professionalism' },
  { label: 'Poor Fit and Engagement', value: 'poor_fit_and_engagement' },
  { label: 'Over expectations', value: 'over_expectations' },
  { label: 'Over qualification', value: 'over_qualification' },
  { label: 'Language deficiency', value: 'language_deficiency' },
  { label: 'Weak technical skills', value: 'weak_technical_skills' },
  { label: 'Poor interpersonal skills', value: 'poor_interpersonal_skills' },
  { label: 'Poor problem-solving skills', value: 'poor_problem_solving_skills' },
  { label: 'Candidate withdrawal', value: 'candidate_withdrawal' },
  { label: 'Others', value: 'others' },
]

export default FailedReasonAutoComplete
