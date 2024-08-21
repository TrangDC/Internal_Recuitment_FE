import { CandidateHistoryCall } from './candidate_history_calls'
import CandidateInterview from './candidate_interview'
import CandidateJobFeedback from './candidate_job_feedback'
import CandidateNote from './candidate_note'
import OutgoingEmail from './out_going_email'

interface CandidateActivity {
  candidate_notes: CandidateNote[]
  candidate_history_calls: CandidateHistoryCall[]
  candidate_interviews: CandidateInterview[]
  outgoing_emails: OutgoingEmail[]
  candidate_job_feedbacks: CandidateJobFeedback[]
  total: number
}

export default CandidateActivity
