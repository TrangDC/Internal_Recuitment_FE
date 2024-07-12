import EntityPermission from './entityPermission'

export type SEND_TO_ENUM =
  | 'interviewer'
  | 'job_request'
  | 'team_manager'
  | 'team_member'
  | 'role'
  | 'candidate'
export type STATUS_EMAIL_ENUM = 'active' | 'inactive'
export type ROLES_EMAIL = {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

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
  send_to: Array<SEND_TO_ENUM>
  status: STATUS_EMAIL_ENUM
  signature: string
  roles: ROLES_EMAIL[]
  cc: string[]
  bcc: string[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export default EmailTemplate
