import Candidate from './candidate'
import { NewAttachmentInput } from './candidate_job'
import User from './user'

export interface CandidateHistoryCall {
  id: string
  name: string
  candidate_id: string
  type: CandidateHistoryCallTypeEnum
  contact_to: string
  date: string
  start_time: string
  end_time: string
  candidate: Candidate
  edited: boolean
  description: string
  created_by: User
  createdAt: string
  updatedAt: string
  attachments: NewAttachmentInput[]
}

export type CreateCandidateHistoryCallArguments = {
  input: NewCandidateHistoryCallInput
  note: string
}

export type UpdateCandidateHistoryCallArguments = {
  id: string
  input: UpdateCandidateHistoryCallInput
  note: string
}

export type DeleteCandidateHistoryCallArguments = {
  id: string
  note: string
}

type NewCandidateHistoryCallInput = {
  name: string
  candidate_id: string
  type: CandidateHistoryCallTypeEnum
  contact_to: string
  date: string
  start_time: string | null
  end_time: string | null
  description: string
  attachments: NewAttachmentInput[]
}

type UpdateCandidateHistoryCallInput = {
  name: string
  contact_to: string
  type: CandidateHistoryCallTypeEnum
  date: string
  start_time: string | null
  end_time: string | null
  description: string
  attachments: NewAttachmentInput[]
}

export enum CandidateHistoryCallTypeEnum {
  CANDIDATE = 'candidate',
  OTHERS = 'others',
}
