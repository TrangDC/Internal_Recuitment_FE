interface OutgoingEmail {
  id: string
  to: string[]
  subject: string
  content: string
  signature: string
  recipient_type: OutgoingEmailRecipientType
  status: OutgoingEmailStatus
  created_at: string
  updated_at: string
}

export enum OutgoingEmailRecipientType {
  CANDIDATE = 'candidate',
  INTERVIEWER = 'interviewer',
  JOB_REQUEST = 'job_request',
  HIRING_TEAM_MANAGER = 'hiring_team_manager',
  HIRING_TEAM_MEMBER = 'hiring_team_member',
  ROLE = 'role',
}

export enum OutgoingEmailStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

export default OutgoingEmail
