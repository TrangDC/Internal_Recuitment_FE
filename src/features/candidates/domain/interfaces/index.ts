import { Job } from 'features/jobs/domain/interfaces'
import { SchemaInputNote } from 'shared/schema'

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  is_black_list: boolean
  last_apply_date: string
  is_able_to_delete: boolean
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
  updated_at: string
  deleted_at: string
}

export type NewCandidateInput = {
  name: string
  email: string
  phone: string
  dob: Date
  note: string
}

export type UpdateCandidateInput = {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  note: string
}

export type DeleteCandidateInput = SchemaInputNote

export type BlackListCandidateInput = {
  id: string
  note?: string
  is_black_list: boolean
}

export type NewCandidateJobInput = {
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments?: string
}

export type UpdateCandidateJobStatus = {
  id: string
  status: string
  attachments: Attachments
  feedback?: string
  failed_reason?: string[]
}

export type Attachments = {
  id: string
  document_name: string
  document_id: string
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
}

//interview
export type FeedBackInput = {
  attachments: Attachments
  feedback?: string
}

export type StepType = {
  id: string
  candidate_job_id: string
  candidate_job_status: string
  created_at: string
  updated_at: string
}
