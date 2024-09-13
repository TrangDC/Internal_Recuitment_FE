import { Attachments } from 'shared/interfaces'
import { CandidateStatusEnum } from '..'
import Attachment from './attachment'
import Candidate from './candidate'
import CandidateJobStep from './candidate_job_step'
import HiringJob from './hiring_job'
import User from './user'
import RecTeam from './rec_team'

type CandidateJobFailedReason =
  | 'poor_professionalism'
  | 'poor_fit_and_engagement'
  | 'over_expectations'
  | 'over_qualification'
  | 'language_deficiency'
  | 'weak_technical_skills'
  | 'poor_interpersonal_skills'
  | 'poor_problem_solving_skills'
  | 'poor_management_skills'
  | 'candidate_withdrawal'
  | 'others'

export type LevelCandidateJob =
  | 'intern'
  | 'fresher'
  | 'junior'
  | 'middle'
  | 'senior'
  | 'manager'
  | 'director'

interface CandidateJob {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: CandidateStatusEnum
  attachments: Attachment[]
  candidate: Candidate
  hiring_job: HiringJob
  owner: User
  failed_reason: CandidateJobFailedReason[]
  is_able_to_delete: boolean
  interview_feature: number
  steps: CandidateJobStep[]
  created_at: string
  updated_at: string
  offer_expiration_date: string
  onboard_date: string
  level: LevelCandidateJob
  rec_team: RecTeam
  rec_in_charge: User
}

export type CreateCandidateJobArguments = {
  input: NewCandidateJobInput
  note: string
}

export type UpdateCandidateJobArguments = {
  input: NewCandidateJobInput
  note: string
}

export type DeleteCandidateJobArguments = {
  id: string
  note: string
}

export type UpdateCandidateJobStatusArguments = {
  id: string
  input: UpdateCandidateJobStatus
  note: string
}

export type UpdateCandidateJobStatus = {
  status: string
  onboard_date: string | null
  offer_expiration_date: string | null
  failed_reason: string[]
  level: LevelCandidateJob | null
}

export type NewCandidateJobInput = {
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments?: NewAttachmentInput[]
  onboard_date: string | null
  offer_expiration_date: string | null
  failed_reason: string[]
  level: LevelCandidateJob | null
  rec_in_charge_id: string
}

export type NewAttachmentInput = {
  id: string
  document_name: string
  document_id: string
}

export type UpdateCandidateJobAttachmentArguments = {
  id: string
  input: UpdateCandidateAttachment
  note: string
}

export type UpdateCandidateAttachment = {
  attachments: Attachments[]
  rec_in_charge_id: string
  onboard_date: string | null
  offer_expiration_date: string | null
}

export default CandidateJob
