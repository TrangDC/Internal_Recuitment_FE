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
  name: string,
  work_email: string,
  note: string,
}

export type ChangeStatusUser = {
  note: string,
  status: 'active' | 'inactive'
}