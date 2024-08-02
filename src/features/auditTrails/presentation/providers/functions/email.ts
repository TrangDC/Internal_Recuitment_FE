import { renderValueReturn } from '.'
import { renderDescription, renderEventEmailTemplate, renderSendTo, renderStatusEmail, renderText } from '../helper'

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
  [Field.SIGNATURE]: renderDescription,
  [Field.STATUS]: renderStatusEmail,
  [Field.SEND_TO]: renderSendTo,
}
export function renderFieldEmailTemplate(field: string): renderValueReturn {
  console.log("🚀 ~ renderFieldEmailTemplate ~ field:", field)
  return audit_trails_email[field as Field] ?? renderText
}
