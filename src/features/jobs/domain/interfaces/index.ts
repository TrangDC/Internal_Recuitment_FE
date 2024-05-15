import { Member, Team } from 'features/teams/domain/interfaces'
import { SchemaInputNote } from 'shared/schema'

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
  slug: string
  team: Team
  user: Member
  created_at: string
  updated_at: string
  deleted_at: string
}

export type NewHiringJobInput = {
  status?: string,
  name: string,
  amount: number,
  location: 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan',
  salary_type: 'range' | 'up_to' | 'negotiate' | 'minimum',
  salary_from?: number,
  salary_to?: number,
  team_id: string,
  currency: 'vnd' | 'usd' | 'jpy',
  created_by: string,
  description?: string,
}

export type UpdateHiringJobInput = {
  id: string,
  status?: string,
  name: string,
  amount: number,
  location: 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan',
  salary_type: 'range' | 'up_to' | 'negotiate' | 'minimum',
  salary_from?: number,
  salary_to?: number,
  team_id: string,
  currency: 'vnd' | 'usd' | 'jpy',
  created_by: string,
  description?: string,
  note: string,
}

export type DeleteJobInput = SchemaInputNote;

