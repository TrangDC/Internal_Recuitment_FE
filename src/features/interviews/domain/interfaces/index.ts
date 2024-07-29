import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { FeedBack } from 'features/feedback/domain/interfaces'
import { Member } from 'features/teams/domain/interfaces'
import { SchemaInputNote } from 'shared/schema'

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

export type Interview = {
  id: string
  title: string
  description: string
  interview_date: string
  start_from: string
  end_at: string
  created_at: Date
  updated_at: Date
  candidate_job: CandidateJob
  owner: Member
  interviewer: Member[]
  candidate_job_id: string
  edited: boolean
  location: string
  meeting_link: string
  status: string
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
    interview: Interview
    feedback: FeedBack
  }
  interviewing: {
    interview: Interview
    feedback: FeedBack
  }
  offering: {
    interview: Interview
    feedback: FeedBack
  }
}
