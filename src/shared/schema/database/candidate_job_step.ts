import { CandidateStatusEnum } from ".."

interface CandidateJobStep {
  id: string
  candidate_job_id: string
  candidate_job_status: CandidateStatusEnum
  created_at: string
  updated_at: string
}

export default CandidateJobStep
