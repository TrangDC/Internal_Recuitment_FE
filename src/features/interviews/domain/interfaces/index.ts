import CandidateInterview from 'shared/schema/database/candidate_interview'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'

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
