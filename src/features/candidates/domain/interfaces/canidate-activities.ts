import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import CandidateNote from 'shared/schema/database/candidate_note'
import OutgoingEmail from 'shared/schema/database/out_going_email'

export type CandidateActivities = (
  | CustomTypeCandidateHistoryCall
  | CustomTypeCandidateNote
  | CustomTypeCandidateInterview
  | CustomTypeCandidateEmail
  | CustomTypeCandidateJobFeedback
)[]

export enum ActivitiesCategoryEnums {
  NOTE = 'note',
  HISTORY_CALL = 'history_call',
  INTERVIEW = 'Interview',
  EMAIL = 'email',
  FEEDBACK = 'feedback',
}

export type CustomTypeCandidateHistoryCall = {
  type: ActivitiesCategoryEnums.HISTORY_CALL
  data: CandidateHistoryCall
  createdAt: string
}

export type CustomTypeCandidateNote = {
  type: ActivitiesCategoryEnums.NOTE
  data: CandidateNote
  createdAt: string
}

export type CustomTypeCandidateInterview = {
  type: ActivitiesCategoryEnums.INTERVIEW
  data: CandidateInterview
  createdAt: string
}

export type CustomTypeCandidateEmail = {
  type: ActivitiesCategoryEnums.EMAIL
  data: OutgoingEmail
  createdAt: string
}

export type CustomTypeCandidateJobFeedback = {
  type: ActivitiesCategoryEnums.FEEDBACK
  data: CandidateJobFeedback
  createdAt: string
}
