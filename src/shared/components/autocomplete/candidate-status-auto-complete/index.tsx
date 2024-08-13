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

export const application_data = {
  applied: {label: 'Applied', value: 'applied'},
  interviewing: {label: 'Interviewing', value: 'interviewing'},
  offering: {label: 'Offering', value: 'offering'},
  hired: {label: 'Hired', value: 'hired'},
  failed_cv: {label: 'Failed CV', value: 'failed_cv'},
  failed_interview: {label: 'Failed interview', value: 'failed_interview'},
  offer_lost: {label: 'Offer lost', value: 'offer_lost'},
  ex_staff: {label: 'Ex-staff', value: 'ex_staff'},
  new: {label: 'New', value: 'new'},
}

export const options_status: IOption[] = [
  { label: application_data.applied.label, value: application_data.applied.value },
  { label: application_data.interviewing.label, value: application_data.interviewing.value },
  { label: application_data.offering.label, value: application_data.offering.value },
  { label: application_data.hired.label, value: application_data.hired.value },
  { label: application_data.failed_cv.label, value: application_data.failed_cv.value },
  { label: application_data.failed_interview.label, value: application_data.failed_interview.value },
  { label: application_data.offer_lost.label, value: application_data.offer_lost.value },
  { label: application_data.ex_staff.label, value: application_data.ex_staff.value },
]

export const options_status_new: IOption[] = [
  { label: application_data.new.label, value: application_data.new.value },
  { label: application_data.applied.label, value: application_data.applied.value },
  { label: application_data.interviewing.label, value: application_data.interviewing.value },
  { label: application_data.offering.label, value: application_data.offering.value },
  { label: application_data.hired.label, value: application_data.hired.value },
  { label: application_data.failed_cv.label, value: application_data.failed_cv.value },
  { label: application_data.failed_interview.label, value: application_data.failed_interview.value },
  { label: application_data.offer_lost.label, value: application_data.offer_lost.value },
  { label: application_data.ex_staff.label, value: application_data.ex_staff.value },
]

export default CandidateStatusAutoComplete
