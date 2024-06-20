import { Member, Team } from 'features/teams/domain/interfaces'

export type Job = {
  id: string
  name: string
  description: string
  amount: number
  location: 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan'
  salary_type: 'range' | 'up_to' | 'negotiate' | 'minimum'
  salary_from: number
  salary_to: number
  currency: 'vnd' | 'usd' | 'jpy'
  status: 'draft' | 'opened' | 'closed'
  is_able_to_delete: boolean,
  is_able_to_close: boolean,
  slug: string
  team: Team
  user: Member
  priority: 1 | 2 | 3 | 4
  total_candidates_recruited: number,
  skill: string[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export type NewHiringJobInput = {
  status: 'draft' | 'opened' | 'closed',
  name: string,
  amount: number,
  location: 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan',
  salary_type: 'range' | 'up_to' | 'negotiate' | 'minimum',
  salary_from: number,
  salary_to: number,
  team_id: string,
  currency: 'vnd' | 'usd' | 'jpy',
  created_by: string,
  description: string,
  note: string,
  skill: string[]
}

export type UpdateHiringJobInput = {
  name: string,
  amount: number,
  location: 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan',
  salary_type: 'range' | 'up_to' | 'negotiate' | 'minimum',
  salary_from: number,
  salary_to: number,
  team_id: string,
  currency: 'vnd' | 'usd' | 'jpy',
  created_by: string,
  description: string,
  note: string,
  // skill: string[]
}

export type UpdateJobStatus = {
  id: string,
  status: 'draft' | 'opened' | 'closed',
  note: string,
}

