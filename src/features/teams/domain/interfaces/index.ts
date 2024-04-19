export type Employee = {
  id: string
  fullName: string
  nickName: number
  companyAccountId: number
  code: string
  gender: number
}

export type Team = {
  id: string,
  name: string,
  open_request: number,
}

export type Managers = {
  id: number,
  name: string,
  email: string,
}

export type JobTitle = {
  id: string
  code: string
  name: string
  description: string
}

export type NewJobTitleInput = {
  code: string
  name: string
  description: string
}
