import { SchemaInputNote } from "shared/schema"

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  is_black_list: boolean
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
  name: string,
  email: string,
  phone: string,
  dob: string,
}

export type UpdateCandidateInput = {
  id: string,
  name: string,
  email: string,
  phone: string,
  dob: string,
}

export type DeleteCandidateInput = SchemaInputNote

export type BlackListCandidateInput = {
  id: string,
  description: string,
  is_black_list: boolean,
}

export type Interview = {
  id: string
  job_name: string
  team: string
  applied_date: string
  status: string
}

export type FeedBack = {
  name: string
  description: string
}
