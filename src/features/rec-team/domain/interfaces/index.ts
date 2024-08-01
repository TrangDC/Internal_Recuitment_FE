export type NewRecTeamInput = {
  name: string
  leader: string
  note: string
}

export type UpdateRecTeam = {
  name: string
  leader_id: string[]
  note: string
}
