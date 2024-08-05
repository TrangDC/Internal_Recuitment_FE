import { renderValueReturn } from '.'
import { renderDescription, renderEventEmailTemplate, renderListItem, renderSendTo, renderStatusEmail, renderText } from '../helper'

enum Field {
  EVENT = 'event',
  CONTENT = 'content',
  SIGNATURE = 'signature',
  STATUS = 'status',
  SEND_TO = 'send_to',
  CC = 'cc'
}

enum ShowField {
  BCC = 'bcc'
}

const audit_trails_email: Record<Field, renderValueReturn> = {
  [Field.EVENT]: renderEventEmailTemplate,
  [Field.CONTENT]: renderDescription,
  [Field.SIGNATURE]: renderDescription,
  [Field.STATUS]: renderStatusEmail,
  [Field.SEND_TO]: renderSendTo,
  [Field.CC]: renderListItem
}

export function renderFieldEmailTemplate(field: string): renderValueReturn {
  return audit_trails_email[field as Field] ?? renderText
}

const show_field_email: Record<ShowField, boolean> = {
  [ShowField.BCC]: false,
}

export function showFieldEmail(field: string): boolean {
  return show_field_email[field as ShowField] ?? true
}
