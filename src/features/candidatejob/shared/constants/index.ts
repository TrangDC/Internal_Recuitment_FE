import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'
import { STATUS_CANDIDATE } from 'shared/constants/constants'

export const CANDIDATE_STATUS = {
  applied: { text: 'Applied', backgroundColor: '#FFAF46' },
  interviewing: { text: 'Interviewing', backgroundColor: '#5CBAFE' },
  offering: { text: 'Offering', backgroundColor: '#20A4A9' },
  hired: { text: 'Hired', backgroundColor: '#7874FE' },
  offer_lost: { text: 'Offered lost', backgroundColor: '#82868C' },
  ex_staff: { text: 'Ex-staff', backgroundColor: '#000' },
  new: { text: 'New', backgroundColor: '#FC105C' },
  failed_cv: { text: 'Failed CV', backgroundColor: '#82868C' },
  failed_interview: { text: 'Failed Interview', backgroundColor: '#82868C' },
}

export const list_status_disabled = {
  [application_data.applied.value]: [
    application_data.applied.value,
    application_data.ex_staff.value,
    application_data.hired.value,
    application_data.offer_lost.value,
    application_data.failed_interview.value,
  ],
  [application_data.interviewing.value]: [
    application_data.ex_staff.value,
    application_data.applied.value,
    application_data.interviewing.value,
    application_data.hired.value,
    application_data.offer_lost.value,
    application_data.failed_cv.value,
  ],
  [application_data.offering.value]: [
    application_data.applied.value,
    application_data.interviewing.value,
    application_data.offering.value,
    application_data.failed_cv.value,
    application_data.failed_interview.value,
    application_data.ex_staff.value
  ],
  [application_data.hired.value]: [
    application_data.applied.value,
    application_data.interviewing.value,
    application_data.offering.value,
    application_data.hired.value,
    application_data.failed_cv.value,
    application_data.failed_interview.value,
    application_data.offer_lost.value,
  ],
}

export const status_disabled_applied = [
  application_data.hired.value,
  application_data.failed_cv.value,
  application_data.failed_interview.value,
  application_data.offer_lost.value,
  application_data.ex_staff.value,
]
