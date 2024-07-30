import { SchemaInputNote } from 'shared/schema'

export type NewCandidateInput = {
  name: string
  email: string
  phone: string
  dob: Date
  note: string
}

export type UpdateCandidateInput = {
  name: string
  email: string
  phone: string
  dob: Date
  note: string
}

export type DeleteCandidateInput = SchemaInputNote

export type BlackListCandidateInput = {
  note: string
  is_black_list: boolean
}
