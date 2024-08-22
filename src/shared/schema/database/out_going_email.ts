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
  event: EmailTemplateEvent
}

export enum EmailTemplateEvent {
  CANDIDATE_APPLIED_TO_KIV = 'candidate_applied_to_kiv',
  CANDIDATE_INTERVIEWING_TO_KIV = 'candidate_interviewing_to_kiv',
  CANDIDATE_INTERVIEWING_TO_OFFERING = 'candidate_interviewing_to_offering',
  CREATED_INTERVIEW = 'created_interview',
  UPDATING_INTERVIEW = 'updating_interview',
  CANCEL_INTERVIEW = 'cancel_interview',
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
