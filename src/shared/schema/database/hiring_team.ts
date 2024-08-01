import User from './user'

export type HiringTeamApprove = {
  id: string
  user_id: string
  order_id: number
  user: User
  created_at: string
  updated_at: string
}

interface HiringTeam {
  id: string
  name: string
  slug: string
  managers: User[]
  approvers: HiringTeamApprove[]
  description: string
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

type HiringTeamApproverInput = {
  id: string
  user_id: string
  order_id: number
}

type NewHiringTeamInput = {
  name: string
  members: string[]
  approvers: HiringTeamApproverInput[]
  description?: string
}

type UpdateHiringTeam = {
  name: string
  members: string[]
  approvers: HiringTeamApproverInput[]
  description?: string
}

export default HiringTeam
