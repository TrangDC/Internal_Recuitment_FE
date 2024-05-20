import { Attachments, CandidateJob } from "features/candidates/domain/interfaces"
import { Member } from "features/teams/domain/interfaces"

export type NewCandidateJobFeedbackInput = {
  candidate_job_id: string
  feedback: string
  attachments: {
    document_name: string,
    document_id: string,
  }
}

export type FeedBack = {
  id: string,
  candidate_job: CandidateJob
  created_by: string
  candidate_job_id: string
  feedback: string
  created_at: string
  updated_at: string
  owner: Member
  attachments: Attachments
}
