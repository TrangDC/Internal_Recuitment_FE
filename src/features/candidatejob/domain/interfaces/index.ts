import { Attachments, Candidate } from "features/candidates/domain/interfaces"
import { Job } from "features/jobs/domain/interfaces"

export type CandidateJob = {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments: Attachments
  candidate: Candidate
  hiring_job: Job
  created_at: string
  updated_at: string
}
