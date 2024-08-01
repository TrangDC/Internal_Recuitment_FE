import { renderValueReturn } from '.'
import { renderApprovers, renderDescription, renderEventEmailTemplate, renderSendTo, renderStatusEmail, renderText } from '../helper'

enum Field {
  EVENT = 'event',
  CONTENT = 'content',
  SIGNATURE = 'signature',
  STATUS = 'status',
  SEND_TO = 'send_to',
}

const audit_trails_email: Record<Field, renderValueReturn> = {
  [Field.EVENT]: renderEventEmailTemplate,
  [Field.CONTENT]: renderDescription,
  [Field.SIGNATURE]: renderStatusEmail,
  [Field.STATUS]: renderSendTo,
  [Field.SEND_TO]: renderApprovers,
}
export function renderFieldEmailTemplate(field: string): renderValueReturn {
  return audit_trails_email[field as Field] ?? renderText
}
