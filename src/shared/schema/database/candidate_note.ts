import Attachment from './attachment'
import Candidate from './candidate'
import { NewAttachmentInput } from './candidate_job'
import User from './user'

interface CandidateNote {
  id: string
  candidate: Candidate
  created_by: User
  name: string
  description: string
  attachments: Attachment[]
  created_at: string
  updated_at: string
  edited: boolean
}

export type CreateCandidateNoteArguments = {
  input: NewCandidateNoteInput
}

export type UpdateCandidateNoteArguments = {
  id: string
  input: UpdateCandidateNoteInput
  note: string
}

export type DeleteCandidateNoteArguments = {
  id: string
  note: string
}

export type NewCandidateNoteInput = {
  candidate_id: string
  name: string
  description: string
  attachments: NewAttachmentInput[]
}

export type UpdateCandidateNoteInput = {
  name: string
  description: string
  attachments: NewAttachmentInput[]
}

export default CandidateNote
