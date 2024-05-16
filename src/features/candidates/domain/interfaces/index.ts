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
  note: string,
}

export type DeleteCandidateInput = SchemaInputNote

export type BlackListCandidateInput = {
  id: string,
  note: string,
  is_black_list: boolean,
}

export type NewCandidateJobInput = {
  candidate_id: string
  hiring_job_id: string
  status: string
  attachments?: string
}

export type CandidateJob = {
  id: string
  candidate_id: string
  hiring_job_id: string
  status: string
  created_at: string
  updated_at: string
}

//interview
export type Interview = {
  id: string
  job_name: string
  team: string
  applied_date: string
  status: string
  attachments: {
    id: string,
    document_name: string,
    document_id: string,
  }
}

export type FeedBack = {
  name: string
  description: string
}
