interface JobPosition {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export default JobPosition

type NewJobPositionInput = {
  name: string
  description?: string
}
export type CreateJobPositionArguments = {
  input: NewJobPositionInput
  note: string
}

type UpdateJobPositionInput = {
  name: string
  description?: string
}
export type UpdateJobPositionArguments = {
  id: string
  input: UpdateJobPositionInput
  note: string
}
