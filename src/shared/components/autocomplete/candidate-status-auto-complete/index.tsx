import { AutocompleteBase } from '../autocomplete-base'
import {
  IAutocompleteCommonProps,
  IOption,
} from '../autocomplete-base/interface'

interface Props {
  options?: IOption[]
}

function CandidateStatusAutoComplete<Multiple extends boolean>({
  options = options_status,
  ...props
}: IAutocompleteCommonProps<Multiple> & Props) {
  return <AutocompleteBase<Multiple> {...props} options={options} />
}

export const application_data = {
  applied: { label: 'Applied', value: 'applied', backgroundColor: '#FFAF46' },
  interviewing: {
    label: 'Interviewing',
    value: 'interviewing',
    backgroundColor: '#5CBAFE',
  },
  offering: {
    label: 'Offering',
    value: 'offering',
    backgroundColor: '#20A4A9',
  },
  hired: { label: 'Hired', value: 'hired', backgroundColor: '#7874FE' },
  failed_cv: {
    label: 'Failed CV',
    value: 'failed_cv',
    backgroundColor: '#82868C',
  },
  failed_interview: {
    label: 'Failed interview',
    value: 'failed_interview',
    backgroundColor: '#82868C',
  },
  offer_lost: {
    label: 'Offer lost',
    value: 'offer_lost',
    backgroundColor: '#82868C',
  },
  ex_staff: {
    label: 'Ex-staff',
    value: 'ex_staff',
    backgroundColor: '#FC105C',
  },
  new: { label: 'New', value: 'new', backgroundColor: '#2CC5BD' },
}

export const options_status: IOption[] = [
  {
    label: application_data.applied.label,
    value: application_data.applied.value,
  },
  {
    label: application_data.interviewing.label,
    value: application_data.interviewing.value,
  },
  {
    label: application_data.offering.label,
    value: application_data.offering.value,
  },
  { label: application_data.hired.label, value: application_data.hired.value },
  {
    label: application_data.failed_cv.label,
    value: application_data.failed_cv.value,
  },
  {
    label: application_data.failed_interview.label,
    value: application_data.failed_interview.value,
  },
  {
    label: application_data.offer_lost.label,
    value: application_data.offer_lost.value,
  },
  {
    label: application_data.ex_staff.label,
    value: application_data.ex_staff.value,
  },
]

export const options_status_new: IOption[] = [
  { label: application_data.new.label, value: application_data.new.value },
  {
    label: application_data.applied.label,
    value: application_data.applied.value,
  },
  {
    label: application_data.interviewing.label,
    value: application_data.interviewing.value,
  },
  {
    label: application_data.offering.label,
    value: application_data.offering.value,
  },
  { label: application_data.hired.label, value: application_data.hired.value },
  {
    label: application_data.failed_cv.label,
    value: application_data.failed_cv.value,
  },
  {
    label: application_data.failed_interview.label,
    value: application_data.failed_interview.value,
  },
  {
    label: application_data.offer_lost.label,
    value: application_data.offer_lost.value,
  },
  {
    label: application_data.ex_staff.label,
    value: application_data.ex_staff.value,
  },
]

export default CandidateStatusAutoComplete
