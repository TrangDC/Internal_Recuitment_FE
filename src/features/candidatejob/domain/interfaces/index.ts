import { Attachments, Candidate } from "features/candidates/domain/interfaces"

export type CandidateJob = {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments: Attachments
  candidate: Candidate
  created_at: string
  updated_at: string
}
