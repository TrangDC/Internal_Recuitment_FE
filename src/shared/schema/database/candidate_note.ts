import Attachment from './attachment'
import Candidate from './candidate'
import User from './user'

interface CandidateNote {
  id: string
  candidate: Candidate
  created_by: User
  name: string
  description: string
  attachments: Attachment[]
  created_at: string
  updated_at: string
}

export default CandidateNote
