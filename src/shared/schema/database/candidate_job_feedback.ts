import { CandidateStatusEnum } from '..'
import Attachment from './attachment'
import CandidateJob, { NewAttachmentInput } from './candidate_job'
import User from './user'

interface CandidateJobFeedback {
  id: string
  created_by: string
  candidate_job_id: string
  candidate_job: CandidateJob
  owner: User
  feedback: string
  edited: boolean
  attachments: Attachment[]
  candidate_job_status: CandidateStatusEnum
  created_at: string
  updated_at: string
}

export type CreateCandidateJobFeedbackArguments = {
  input: NewCandidateJobFeedbackInput
  note: string
}

export type DeleteCandidateJobFeedbackArguments = {
  id: string
  note: string
}

export type UpdateCandidateJobFeedbackArguments = {
  id: string
  input: UpdateCandidateJobFeedbackInput
  note: string
}

export type UpdateCandidateJobFeedbackInput = {
  feedback: string
  attachments: NewAttachmentInput[]
}

export type NewCandidateJobFeedbackInput = {
  candidate_job_id: string
  feedback: string
  attachments: NewAttachmentInput[]
}

export default CandidateJobFeedback
