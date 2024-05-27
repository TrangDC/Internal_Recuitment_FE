import { Attachments, Candidate, StepType } from "features/candidates/domain/interfaces"
import { Job } from "features/jobs/domain/interfaces"

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
  attachments: Attachments
  candidate: Candidate
  hiring_job: Job
}