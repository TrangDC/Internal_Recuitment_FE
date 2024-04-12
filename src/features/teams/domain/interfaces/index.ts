export type Employee = {
  id: string
  fullName: string
  nickName: number
  companyAccountId: number
  code: string
  gender: number
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
