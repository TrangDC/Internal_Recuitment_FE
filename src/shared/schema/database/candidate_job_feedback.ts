import Attachment from './attachment'
import CandidateJob from './candidate_job'
import User from './user'

interface CandidateJobFeedback {
  id: string
  created_by: string
  candidate_job_id: string
  candidate_job: CandidateJob
  owner: User
  feedback: string
  edited: boolean
  attachments: Attachment[]
  created_at: string
  updated_at: string
}

export default CandidateJobFeedback
