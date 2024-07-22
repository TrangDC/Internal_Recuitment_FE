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

export const failed_reason_data = {
  poor_professionalism: {label: 'Poor Professionalism', value: 'poor_professionalism'},
  poor_fit_and_engagement: {label: 'Poor Fit and Engagement', value: 'poor_fit_and_engagement'},
  over_expectations: {label: 'Over expectations', value: 'over_expectations'},
  over_qualification: {label: 'Over qualification', value: 'over_qualification'},
  language_deficiency: {label: 'Language deficiency', value: 'language_deficiency'},
  weak_technical_skills: {label: 'Weak technical skills', value: 'weak_technical_skills'},
  poor_interpersonal_skills: {label: 'Poor interpersonal skills', value: 'poor_interpersonal_skills'},
  poor_problem_solving_skills: {label: 'Poor problem-solving skills', value: 'poor_problem_solving_skills'},
  poor_management_skills: {label: 'Poor management skills', value: 'poor_management_skills'},
  candidate_withdrawal: {label: 'Candidate withdrawal', value: 'candidate_withdrawal'},
  others: {label: 'Others', value: 'others'},
}

const options: IOption[] = [
  { label: failed_reason_data.poor_professionalism.label, value: failed_reason_data.poor_professionalism.value },
  { label: failed_reason_data.poor_fit_and_engagement.label, value: failed_reason_data.poor_fit_and_engagement.value },
  { label: failed_reason_data.over_expectations.label, value: failed_reason_data.over_expectations.value },
  { label: failed_reason_data.over_qualification.label, value: failed_reason_data.over_qualification.value },
  { label: failed_reason_data.language_deficiency.label, value: failed_reason_data.language_deficiency.value },
  { label: failed_reason_data.weak_technical_skills.label, value: failed_reason_data.weak_technical_skills.value },
  { label: failed_reason_data.poor_interpersonal_skills.label, value: failed_reason_data.poor_interpersonal_skills.value },
  { label: failed_reason_data.poor_problem_solving_skills.label, value:  failed_reason_data.poor_problem_solving_skills.value},
  { label: failed_reason_data.poor_management_skills.label, value:  failed_reason_data.poor_management_skills.value },
  { label: failed_reason_data.candidate_withdrawal.label, value: failed_reason_data.candidate_withdrawal.value},
  { label: failed_reason_data.others.label, value: failed_reason_data.others.value },
]

export default FailedReasonAutoComplete