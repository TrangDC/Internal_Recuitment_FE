import { CandidateStatusEnum } from '..'
import Attachment from './attachment'
import Candidate from './candidate'
import CandidateJobStep from './candidate_job_step'
import HiringJob from './hiring_job'
import User from './user'

type CandidateJobFailedReason =
  | 'poor_professionalism'
  | 'poor_fit_and_engagement'
  | 'over_expectations'
  | 'over_qualification'
  | 'language_deficiency'
  | 'weak_technical_skills'
  | 'poor_interpersonal_skills'
  | 'poor_problem_solving_skills'
  | 'poor_management_skills'
  | 'candidate_withdrawal'
  | 'others'

interface CandidateJob {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: CandidateStatusEnum
  attachments: Attachment
  candidate: Candidate
  hiring_job: HiringJob
  owner: User
  failed_reason: CandidateJobFailedReason
  is_able_to_delete: boolean
  interview_feature: number
  steps: CandidateJobStep
  created_at: string
  updated_at: string
}

export default CandidateJob
