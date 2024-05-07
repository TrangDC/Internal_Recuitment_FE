export type Member = {
  id: string
  name: string
  work_email: number
}

export type Team = {
  id: string,
  name: string,
  open_request: number,
  members: Member[]
}

export type Managers = {
  id: number,
  name: string,
  email: string,
}

export type NewTeamInput = {
  id?: string,
  name: string
  members: string[]
}

export type DeleteTeamInput = {
  id: string,
  description: string,
}