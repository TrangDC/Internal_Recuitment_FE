import { CandidateHistoryCall } from './candidate_history_calls'
import CandidateInterview from './candidate_interview'
import CandidateNote from './candidate_note'
import OutgoingEmail from './out_going_email'

interface CandidateActivity {
  candidate_notes: CandidateNote[]
  candidate_history_calls: CandidateHistoryCall[]
  candidate_interviews: CandidateInterview[]
  outgoing_emails: OutgoingEmail[]
  total: number
}

export default CandidateActivity
