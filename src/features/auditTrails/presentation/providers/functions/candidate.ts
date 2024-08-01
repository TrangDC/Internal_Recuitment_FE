import { renderValueReturn } from '.'
import { renderAttachment, renderDate, renderDescription, renderReferenceType, renderReferenceValue, renderText, renderYesNo } from '../helper'

enum Field {
  DOB = 'dob',
  RECRUIT_TIME = 'recruit_time',
  IS_BLACKLIST = 'is_blacklist',
  REFERENCE_TYPE = 'reference_type',
  REFERENCE_VALUE = 'reference_value',
  DESCRIPTION = 'description',
  DOCUMENT = 'document',
}

const audit_trails_candidate: Record<Field, renderValueReturn> = {
  [Field.DOB]: renderDate,
  [Field.RECRUIT_TIME]: renderDate,
  [Field.IS_BLACKLIST]: renderYesNo,
  [Field.REFERENCE_TYPE]: renderReferenceType,
  [Field.REFERENCE_VALUE]: renderReferenceValue,
  [Field.DESCRIPTION]: renderDescription,
  [Field.DOCUMENT]: renderAttachment,
}
export function renderFieldCandidateJob(field: string): renderValueReturn {
  return audit_trails_candidate[field as Field] ?? renderText
}
