import { CandidateStatusEnum } from '..'
import CandidateJob from './candidate_job'
import User from './user'

export type CandidateInterviewStatus =
  | 'invited_to_interview'
  | 'interviewing'
  | 'done'
  | 'cancelled'

export interface CandidateInterview {
  id: string
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: User[]
  candidate_job: CandidateJob
  edit_able: boolean
  owner: User
  status: CandidateInterviewStatus
  edited: boolean
  location: string
  meeting_link: string
  candidate_job_status: CandidateStatusEnum
  created_at: string
  updated_at: string
}

export type CreateCandidateInterview4CalendarArguments = {
  input: NewCandidateInterview4CalendarInput
  note: string
}

export type CreateCandidateInterviewArguments = {
  input: NewCandidateInterviewInput
  note: String
}

export type NewCandidateInterviewInput = {
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
  location: string
  meeting_link: string
}

export type NewCandidateInterview4CalendarInput = {
  title: string
  candidate_id: string[]
  interviewer: string[]
  interview_date: string
  start_from: string
  end_at: string
  description: string
  job_id: string
  location: string
  meeting_link: string
}

export type UpdateCandidateInterviewArguments = {
  id: string
  input: UpdateCandidateInterviewInput
  note: string
}

export type UpdateCandidateInterviewInput = {
  title: string
  description: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
  location: string
  meeting_link: string
}

export type DeleteCandidateInterviewArguments = {
  id: string
  note: string
}

export type UpdateCandidateInterviewScheduleInput = {
  interview_date: string
  start_from: string
  end_at: string
  interviewer?: string[]
}

export type UpdateCandidateInterviewScheduleArguments = {
  id: string
  input: UpdateCandidateInterviewScheduleInput
}

export type UpdateCandidateInterviewStatusArguments = {
  id: string
  input: UpdateCandidateInterviewStatusInput
  note: String
}

export type UpdateCandidateInterviewStatusInput = {
  status: 'done' | 'cancelled'
}

export default CandidateInterview
