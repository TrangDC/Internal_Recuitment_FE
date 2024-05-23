import { Team } from "features/teams/domain/interfaces";

export type Hiring = {
  id: string,
  name: string,
  work_email: string,
  team: Team,
  status: 'active' | 'inactive'
  created_at: string,
  updated_at: string,
}

export type HiringInput = {
  id: string,
  name: string,
  work_email: string,
  // team: string,
}

export type ChangeStatusUser = {
  id: string,
  note: string,
  status: 'active' | 'inactive'
}