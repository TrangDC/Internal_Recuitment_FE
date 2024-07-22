import { Candidate } from 'features/candidates/domain/interfaces'
import { Job } from 'features/jobs/domain/interfaces'
import { Attachments } from 'shared/interfaces'

export type StepType = {
  id: string
  candidate_job_id: string
  candidate_job_status: string
  created_at: string
  updated_at: string
}

export type CandidateJob = {
  id: string
  candidate_id: string
  hiring_job_id: string
  is_able_to_delete: boolean
  interview_feature: number
  status:
    | 'applied'
    | 'interviewing'
    | 'offering'
    | 'hired'
    | 'kiv'
    | 'offer_lost'
    | 'ex_staff'
    | 'new'
  created_at: string
  steps: StepType[]
  updated_at: string
  attachments: Attachments[]
  candidate: Candidate
  hiring_job: Job
  offer_expiration_date: Date,
  onboard_date: Date
}

export type NewCandidateJobInput = {
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments?: string
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
