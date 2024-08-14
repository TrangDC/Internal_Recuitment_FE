import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import CandidateNote from 'shared/schema/database/candidate_note'

export type CandidateActivities =
  | CandidateNote[]
  | CandidateHistoryCall[]
  | CandidateInterview[]
