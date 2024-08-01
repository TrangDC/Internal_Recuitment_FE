import { renderValueReturn } from '.'
import { renderDate, renderDateTime, renderLink, renderListItem, renderText } from '../helper'

enum Field {
  INTERVIEW_DATE = 'interview_date',
  START_FORM = 'start_from',
  END_AT = 'end_at',
  MEMBERS = 'members',
  MEETING_LINK = 'meeting_link',
}

const audit_trails_candidate_interview: Record<Field, renderValueReturn> = {
  [Field.INTERVIEW_DATE]: renderDate,
  [Field.START_FORM]: renderDateTime,
  [Field.END_AT]: renderDateTime,
  [Field.MEMBERS]: renderListItem,
  [Field.MEETING_LINK]: renderLink,
}
export function renderFieldCandidateInterview(field: string): renderValueReturn {
  return audit_trails_candidate_interview[field as Field] ?? renderText
}
