import Candidate from 'shared/schema/database/candidate'
import HiringJob from 'shared/schema/database/hiring_job'

export type CreateHiringJobArguments = {
  input: NewHiringJobInput
  note: string
}

export type EditHiringJobArguments = {
  input: UpdateHiringJobInput
  note: string
}

export type NewHiringJobInput = {
  status: string
  name: string
  amount: number
  location: string
  salary_type: string
  salary_from: number
  salary_to: number
  hiring_team_id: string
  currency: string
  created_by: string
  description: string
  entity_skill_records: EntitySkillRecordInput[]
  priority: number
}

export type EntitySkillRecordInput = {
  id: string
  skill_id: string
  orderId: number
}

export type UpdateHiringJobInput = {
  name: string
  amount: number
  location: string
  salary_type: string
  salary_from: number
  salary_to: number
  hiring_team_id: string
  currency: string
  created_by: string
  description: string
  entity_skill_records: EntitySkillRecordInput[]
  note: string
}

export type UpdateHiringJobStatus = {
  id: string
  status: string
  note: string
}

export type CandidateStatusItem = {
  id: string
  candidate_id: string
  status: string
  hiring_job_id: string
  hiring_job: HiringJob
  attachments: {
    id: string
    document_name: string
    document_id: string
  }
  candidate: Candidate
  created_at: string
  updated_at: string
}
