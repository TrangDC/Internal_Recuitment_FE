import { CandidateStatusEnum } from '..'
import Attachment from './attachment'
import { NewAttachmentInput } from './candidate_job'
import EntitySkillType from './entity_skill_type'
import { EntitySkillRecordInput } from './hiring_job'
import User from './user'

export type CandidateReferenceType =
  | 'eb'
  | 'rec'
  | 'hiring_platform'
  | 'reference'
  | 'headhunt'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  status: CandidateStatusEnum
  is_black_list: boolean
  last_apply_date: string
  is_able_to_delete: boolean
  hiring_job_title: string
  reference_type: CandidateReferenceType
  reference_value: string
  reference_uid: string
  recruit_time: string
  description: string
  country: string
  attachments: Attachment[]
  entity_skill_types: EntitySkillType[]
  reference_user: User
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateCandidateArguments = {
  input: NewCandidateInput
  note: string
}

export type UpdateCandidateArguments = {
  id: string
  input: UpdateCandidateInput
  note: string
}

export type DeleteCandidateArguments = {
  id: string
  note: string
}

export type NewCandidateInput = {
  email: string
  phone: string
  dob: string | null
  reference_type: CandidateReferenceType
  reference_value: string
  reference_uid: string
  recruit_time: string
  description: string
  country: string
  entity_skill_records: EntitySkillRecordInput[]
  attachments: NewAttachmentInput[]
  name: string
}

export type UpdateCandidateInput = {
  name: string
  email: string
  phone: string
  dob: string | null
  reference_type: CandidateReferenceType
  reference_value: string
  reference_uid: string
  recruit_time: string
  description: string
  country: string
  entity_skill_records: EntitySkillRecordInput[]
  attachments: NewAttachmentInput[]
}

export default Candidate
