import { STATUS_EMAIL_ENUM } from "shared/schema/database/email_template"

export type Email = {
  content: string
  event: string
  send_to: string[]
  cc: string[]
  signature: string,
  subject: string
}

export type NewEmailInput = {
  content: string
  event: string
  send_to: string[]
  cc: string[]
  signature: string
  subject: string
}

export type UpdateEmailInput = {
  content: string
  event: string
  send_to: string[]
  cc: string[]
  bcc: string[]
  signature: string
  subject: string
  note: string
  roleIds: string[]
}

export type UpdateEmailStatus = {
  id: string,
  status: STATUS_EMAIL_ENUM
  note: string,
}