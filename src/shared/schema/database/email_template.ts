import Role from './role'

export type SEND_TO_ENUM =
  | 'interviewer'
  | 'job_request'
  | 'hiring_team_manager'
  | 'hiring_team_member'
  | 'role'
  | 'candidate'
export type STATUS_EMAIL_ENUM = 'active' | 'inactive'

type EVENT_ENUM =
  | 'candidate_applied_to_kiv'
  | 'candidate_interviewing_to_kiv'
  | 'candidate_interviewing_to_offering'
  | 'created_interview'
  | 'updating_interview'
  | 'cancel_interview'

interface EmailTemplate {
  id: string
  event: EVENT_ENUM
  subject: string
  content: string
  send_to: SEND_TO_ENUM[]
  status: STATUS_EMAIL_ENUM
  signature: string
  roles: Role[]
  cc: string[]
  bcc: string[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateEmailTemplateArguments = {
  input: NewEmailTemplateInput
  note: string
}

type NewEmailTemplateInput = {
  event: string
  subject: string
  content: string
  send_to: string[]
  roleIds: string[]
  signature: string
  cc: string[]
  bcc: string[]
}

type UpdateEmailTemplateInput = {
  event: string
  subject: string
  content: string
  send_to: string[]
  roleIds: string[]
  signature: string
  cc: string[]
  bcc: string[]
}

export type UpdateEmailTemplateArguments = {
  id: string
  input: UpdateEmailTemplateInput
  note: string
}

export type UpdateEmailTemplateStatusArguments = {
  id: string
  input: UpdateEmailTemplateStatusInput
  note: string
}

export type DeleteEmailTemplateArguments = {
  id: string
  note: string
}

type UpdateEmailTemplateStatusInput = {
  status: string
}

export default EmailTemplate
