import { CandidateJob } from "features/candidates/domain/interfaces"
import { Member } from "features/teams/domain/interfaces"

export type NewCandidateInterviewInput = {
  title: string
  description?: string
  candidate_job_id: string
  interview_date: string
  start_from: string
  end_at: string
  interviewer: string[]
}

export type Interview = {
  id: string
  title: string
  description: string
  interview_date: string
  start_from: string
  end_at: string
  created_at: string
  updated_at: string
  candidate_job: CandidateJob
  interviewer: Member
  candidate_job_id: string
} 
