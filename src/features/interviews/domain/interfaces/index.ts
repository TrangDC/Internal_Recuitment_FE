import { SchemaInputNote } from 'shared/schema'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'

export type NewCandidateInterviewInput = {
  title: string
  description?: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
  location: string
  meeting_link: string
}

export type UpdateCandidateInterviewInput = {
  title: string
  description: string
  candidate_job_id: string
  interview_date: Date
  start_from: Date
  end_at: Date
  interviewer: string[]
  note: string
  location: string
  meeting_link: string
}

export type DeleteInterviewInput = SchemaInputNote

export type GroupStatusInterview = {
  applied: {
    interview: CandidateInterview
    feedback: CandidateJobFeedback
  }
  interviewing: {
    interview: CandidateInterview
    feedback: CandidateJobFeedback
  }
  offering: {
    interview: CandidateInterview
    feedback: CandidateJobFeedback
  }
}
