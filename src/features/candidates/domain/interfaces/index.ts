import { SchemaInputNote } from 'shared/schema'

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  dob: Date
  is_black_list: boolean
  last_apply_date: string
  is_able_to_delete: boolean
  status:
    | 'applied'
    | 'interviewing'
    | 'offering'
    | 'hired'
    | 'kiv'
    | 'offer_lost'
    | 'ex_staff'
    | 'new'
  created_at: string
  updated_at: string
  deleted_at: string
}

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

