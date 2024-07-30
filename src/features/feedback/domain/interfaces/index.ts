import { SchemaInputNote } from 'shared/schema'

export type NewCandidateJobFeedbackInput = {
  candidate_job_id: string
  feedback: string
  attachments: {
    document_name: string
    document_id: string
  }
}

export type UpdateCandidateJobFeedbackInput = {
  feedback: string
  attachments: {
    document_name: string
    document_id: string
  }[]
  note: string
}

export type DeleteFeedbackInput = SchemaInputNote
