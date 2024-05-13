import { SchemaInputNote } from "shared/schema"

export type Member = {
  id: string
  name: string
  work_email: number
}

export type Team = {
  id: string,
  name: string,
  open_request: number,
  members: Member[],
  slug: string,
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
}

export type UpdateTypeInput = {
  id: string
  name: string
  members?: string[]
  note?: string,
}

export type DeleteTeamInput = SchemaInputNote;