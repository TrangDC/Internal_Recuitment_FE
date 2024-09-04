import EntitySkillType from './entity_skill_type'
import HiringJobStep from './hiring_job_step'
import HiringTeam from './hiring_team'
import JobPosition from './job_position'
import RecTeam from './rec_team'
import User from './user'

type LocationEnum = 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan' | 'singapore'
type SalaryTypeEnum = 'range' | 'up_to' | 'negotiate' | 'minimum'
type CurrencyEnum = 'vnd' | 'usd' | 'jpy'
export type HiringJobStatus =
  | 'pending_approvals'
  | 'opened'
  | 'closed'
  | 'cancelled'
type priority_status = 1 | 2 | 3 | 4
export type HiringJobLevel =
  | 'intern'
  | 'fresher'
  | 'junior'
  | 'middle'
  | 'senior'
  | 'manager'
  | 'director'

export type HiringJobStatusStep =
  | 'waiting'
  | 'pending'
  | 'accepted'
  | 'rejected'

interface HiringJob {
  id: string
  name: string
  slug: string
  description: string
  amount: number
  location: LocationEnum
  salary_type: SalaryTypeEnum
  salary_from: number
  salary_to: number
  currency: CurrencyEnum
  hiring_team: HiringTeam
  user: User
  status: HiringJobStatus
  total_candidates_recruited: number
  is_able_to_close: boolean
  is_able_to_cancel: boolean
  priority: priority_status
  entity_skill_types: EntitySkillType[]
  job_position_id: string
  job_position: JobPosition
  created_at: string
  updated_at: string
  deleted_at: string
  level: HiringJobLevel
  rec_team: RecTeam
  rec_in_charge: User
  note: string
  steps: HiringJobStep[]
  opened_at: string
}

export type CreateHiringJobArguments = {
  input: NewHiringJobInput
  note: string
}

export type EditHiringJobArguments = {
  id: string
  input: UpdateHiringJobInput
  note: string
}

export type UpdateHiringJobStatusArguments = {
  id: string
  status: HiringJobStatus
  note: string
}

export type UpdateHiringJobStepInput = {
  hiring_job_ids: string[]
  status: HiringJobStatusStep
}

export type UpdateHiringJobStepInputArguments = {
  input: UpdateHiringJobStepInput
}

export type DeleteHiringJobArguments = {
  id: string
  note: string
}

export type NewHiringJobInput = {
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
  job_position_id: string
  level: HiringJobLevel
  rec_team_id: string
  note: string
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
  // created_by: string
  description: string
  priority: number
  entity_skill_records: EntitySkillRecordInput[]
  job_position_id: string
  level: HiringJobLevel
  rec_team_id: string
  note: string
  rec_in_charge_id: string
}

export type EntitySkillRecordInput = {
  id: string
  skill_id: string
  orderId: number
}

export default HiringJob
