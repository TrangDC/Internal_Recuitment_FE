import { CandidateJob } from "features/candidatejob/domain/interfaces"
import { Member } from "features/teams/domain/interfaces"
import { Attachments } from "shared/interfaces"
import { SchemaInputNote } from "shared/schema"

export type NewCandidateJobFeedbackInput = {
  candidate_job_id: string
  feedback: string
  attachments: {
    document_name: string,
    document_id: string,
  }
}

export type UpdateCandidateJobFeedbackInput = {
  feedback: string
  attachments: {
    document_name: string,
    document_id: string,
  }[]
  note: string
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
  attachments: Attachments[]
}

export type DeleteFeedbackInput = SchemaInputNote