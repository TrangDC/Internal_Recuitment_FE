import { CandidateStatusEnum } from "shared/schema"

export type StepType = {
  id: string
  candidate_job_id: string
  candidate_job_status: CandidateStatusEnum
  created_at: string
  updated_at: string
}
