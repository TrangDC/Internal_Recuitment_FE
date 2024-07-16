import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

function EventEmailAutocomplete<Multiple extends boolean>(
  props: IAutocompleteCommonProps<Multiple>
) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const EVENT_EMAIL = {
  candidate_applied_to_kiv: {value: 'candidate_applied_to_kiv', label: 'Change status of a candidate from “Applied” to “Keep in view”'},
  candidate_interviewing_to_kiv: {value: 'candidate_interviewing_to_kiv', label: 'Change status of a candidate application from “Interviewing” to “Keep in view”'},
  candidate_interviewing_to_offering: {value: 'candidate_interviewing_to_offering', label: 'Change status of a candidate application from “Interviewing” to “Offering”'},
  created_interview: {value: 'created_interview', label: 'Create an interview for a candidate'},
  updating_interview:  {value: 'updating_interview', label: 'Updating an interview'},
  cancel_interview: {value: 'cancel_interview', label: 'Cancel an interview'},
}

export type EVENT_EMAIL_ENUM = keyof typeof EVENT_EMAIL;

const options: IOption[] = [
  {
    label: EVENT_EMAIL.candidate_applied_to_kiv.label,
    value: EVENT_EMAIL.candidate_applied_to_kiv.value,
  },
  {
    label: EVENT_EMAIL.candidate_interviewing_to_kiv.label,
    value: EVENT_EMAIL.candidate_interviewing_to_kiv.value,
  },
  {
    label: EVENT_EMAIL.candidate_interviewing_to_offering.label,
    value: EVENT_EMAIL.candidate_interviewing_to_offering.value,
  },
  {
    label: EVENT_EMAIL.created_interview.label,
    value: EVENT_EMAIL.created_interview.value,
  },
  { label: EVENT_EMAIL.updating_interview.label, value: EVENT_EMAIL.updating_interview.value },
  { label: EVENT_EMAIL.cancel_interview.label, value: EVENT_EMAIL.cancel_interview.value },
]

export default EventEmailAutocomplete
