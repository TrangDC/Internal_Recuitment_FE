import { JobStatus } from 'shared/class/job-status'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

export const ENABLED_CHANGE_STATUS = {
  [application_data.applied.value]: [
    application_data.interviewing.value,
    application_data.offering.value,
    application_data.failed_cv.value,
  ],
  [application_data.interviewing.value]: [
    application_data.offering.value,
    application_data.failed_interview.value,
  ],
  [application_data.offering.value]: [
    application_data.hired.value,
    application_data.offer_lost.value,
  ],
  [application_data.hired.value]: [application_data.ex_staff.value],
  [application_data.failed_cv.value]: [],
  [application_data.failed_interview.value]: [],
  [application_data.offer_lost.value]: [],
  [application_data.ex_staff.value]: [],
}

const { STATUS_HIRING_JOB } = JobStatus
export const ENABLED_CHANGE_STATUS_JOB = {
  [STATUS_HIRING_JOB.PENDING_APPROVALS]: [STATUS_HIRING_JOB.CANCELLED],
  [STATUS_HIRING_JOB.OPENED]: [
    STATUS_HIRING_JOB.CLOSED,
    STATUS_HIRING_JOB.CANCELLED,
  ],
  [STATUS_HIRING_JOB.CLOSED]: [STATUS_HIRING_JOB.OPENED],
  [STATUS_HIRING_JOB.CANCELLED]: [],
}

export const OPENING_PAGE_APPLICATION = {
  list_candidate: 'ListCandidate',
  kanban: 'Kanban',
}
