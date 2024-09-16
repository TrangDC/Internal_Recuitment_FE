import CandidateInterview from 'shared/schema/database/candidate_interview'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'

export type GroupStatusInterview = {
  interview: CandidateInterview[]
  feedback: CandidateJobFeedback[]
}
