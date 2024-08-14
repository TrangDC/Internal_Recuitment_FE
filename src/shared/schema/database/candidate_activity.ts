import { CandidateHistoryCall } from './candidate_history_calls'
import CandidateInterview from './candidate_interview'
import CandidateNote from './candidate_note'

interface CandidateActivity {
  candidate_notes: CandidateNote[]
  candidate_history_calls: CandidateHistoryCall[]
  candidate_interviews: CandidateInterview[]
}

export default CandidateActivity
