import User from './user'

interface HiringTeam {
  id: string
  name: string
  slug: string
  managers: User[]
  opening_requests: number
  is_able_to_delete: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateHiringTeamArguments = {
  input: NewHiringTeamInput
  note: string
}

export type UpdateHiringTeamArguments = {
  id: string
  input: UpdateHiringTeam
  note: string
}

export type DeleteHiringTeamArguments = {
  id: string
  note: string
}

type NewHiringTeamInput = {
  name: string
  members: string[]
}

type UpdateHiringTeam = {
  name: string
  members: string[]
}

export default HiringTeam
