import { renderValueReturn } from '.'
import { renderAttachment, renderDescription, renderText } from '../helper'

enum Field {
  DESCRIPTION = 'description',
  DOCUMENT = 'document',
}

const audit_trails_candidate_job_feedback: Record<Field, renderValueReturn> = {
  [Field.DESCRIPTION]: renderDescription,
  [Field.DOCUMENT]: renderAttachment,
}
export function renderFieldCandidateJobFeedback(field: string): renderValueReturn {
  return audit_trails_candidate_job_feedback[field as Field] ?? renderText
}
