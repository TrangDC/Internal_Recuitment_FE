import User from './user'

interface RecTeam {
  id: string
  name: string
  slug: string
  leader_id: string
  leader: User
  description: string
  opening_requests: number
  is_able_to_delete: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateRecTeamArguments = {
  input: NewRecTeamInput
  note: string
}
export type UpdateRecTeamArguments = {
  id: string
  input: UpdateRecTeam
  note: string
}
export type DeleteRecTeamArguments = {
  id: string
  note: string
}

type NewRecTeamInput = {
  name: string
  leader_id: string
  description: string
}

type UpdateRecTeam = {
  name: string
  leader_id: string
  description?: string
}
export default RecTeam
