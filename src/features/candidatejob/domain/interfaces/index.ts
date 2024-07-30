import { Attachments } from 'shared/interfaces'

export type CreateCandidateJobArguments = {
  input: NewCandidateJobInput
  note: string
}

export type StepType = {
  id: string
  candidate_job_id: string
  candidate_job_status: string
  created_at: string
  updated_at: string
}

export type NewCandidateJobInput = {
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments?: NewAttachmentInput[]
  onboard_date: string | null
  offer_expiration_date: string | null
  failed_reason: string[]
}

export type NewAttachmentInput = {
  id: string
  document_name: string
  document_id: string
}

export type DeleteCandidateJobInput = {
  id: string
  note: string
}

export type UpdateStatus = {
  status: string
  note: string
  failed_reason: string[]
  offer_expiration_date: string
  onboard_date: string
}
export type UpdateCandidateJobStatus = {
  status: string
  attachments: Attachments[]
  feedback: string
  failed_reason: string[]
  note: string
  offer_expiration_date: Date
  onboard_date: Date
}

export type UpdateCandidateAttachment = {
  attachments: Attachments[]
  note: string
}
