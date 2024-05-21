import { SchemaInputNote } from "shared/schema"

export type Member = {
  id: string
  name: string
  work_email: number
}

export type Team = {
  id: string,
  name: string,
  opening_requests: number,
  members: Member[],
  slug: string,
  newest_applied?: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
}

export type Managers = {
  id: number,
  name: string,
  email: string,
}

export type NewTeamInput = {
  name: string
  members?: string[]
  note?: string,
}

export type UpdateTypeInput = {
  id: string
  name: string
  members?: string[]
  note?: string,
}

export type DeleteTeamInput = SchemaInputNote