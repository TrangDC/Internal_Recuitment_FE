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
  is_able_to_delete: boolean,
  slug: string,
  newest_applied?: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  note: string,
}

export type NewTeamInput = {
  name: string
  members: string[]
  note: string,
}

export type UpdateTeamInput = {
  name: string
  members: string[]
  note: string,
}