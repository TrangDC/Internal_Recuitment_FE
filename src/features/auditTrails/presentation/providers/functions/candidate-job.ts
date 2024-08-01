import { renderValueReturn } from '.'
import { renderAttachment, renderDate, renderFailedReason, renderStatusCandidateJob, renderText } from '../helper'

enum Field {
  STATUS = 'status',
  DOCUMENT = 'document',
  ONBOARD_DATE = 'onboard_date',
  OFFER_EXPIATION_DATE = 'offer_expiration_date',
  FAILED_REASON = 'failed_reason',
}

const audit_trails_candidate_job: Record<Field, renderValueReturn> = {
  [Field.STATUS]: renderStatusCandidateJob,
  [Field.DOCUMENT]: renderAttachment,
  [Field.ONBOARD_DATE]: renderDate,
  [Field.OFFER_EXPIATION_DATE]: renderDate,
  [Field.FAILED_REASON]: renderFailedReason,
}
export function renderFieldCandidateJob(field: string): renderValueReturn {
  return audit_trails_candidate_job[field as Field] ?? renderText
}
