import CandidateJob from './candidate_job'
import User from './user'

type CandidateInterviewStatus =
  | 'invited_to_interview'
  | 'interviewing'
  | 'done'
  | 'cancelled'

interface CandidateInterview {
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
  created_at: string
  updated_at: string
}

export default CandidateInterview
