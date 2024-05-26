import { Attachments, Candidate } from "features/candidates/domain/interfaces"
import { Job } from "features/jobs/domain/interfaces"

export type CandidateJob = {
  id: string
  candidate_id: string
  is_able_to_delete: boolean
  hiring_job_id: string
  status:
  | 'applied'
  | 'interviewing'
  | 'offering'
  | 'hired'
  | 'kiv'
  | 'offer_lost'
  | 'ex_staff'
  | 'new'
  attachments: Attachments
  candidate: Candidate
  hiring_job: Job
  created_at: string
  updated_at: string
}
