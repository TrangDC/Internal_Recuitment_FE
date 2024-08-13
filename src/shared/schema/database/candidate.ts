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

export enum CandidateGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}
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

  address: string
  candidate_exp: CandidateExp[]
  candidate_educate: CandidateEducate[]
  candidate_award: CandidateAward[]
  candidate_certificate: CandidateCertificate[]
  avatar: string
  gender: CandidateGenderEnum
}

type CandidateExp = {
  id: string
  position: string
  company: string
  location: string
  start_date: string
  end_date: string
  description: string
  order_id: number
  is_current: boolean
  created_at: string
  updated_at: string
}

type CandidateEducate = {
  id: string
  school_name: string
  major: string
  gpa: string
  start_date: string
  end_date: string
  location: string
  description: string
  attachments: Attachment[]
  order_id: number
  is_current: boolean
  created_at: string
  updated_at: string
}

type CandidateAward = {
  id: string
  name: string
  achieved_date: string
  attachments: Attachment[]
  order_id: number
  created_at: string
  updated_at: string
}

type CandidateCertificate = {
  id: string
  name: string
  score: string
  achieved_date: string
  attachments: Attachment[]
  order_id: number
  created_at: string
  updated_at: string
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
  address: string
  candidate_exp: CandidateExpInput[]
  candidate_educate: CandidateEducateInput[]
  candidate_award: CandidateAwardInput[]
  candidate_certificate: CandidateCertificateInput[]
  avatar: string
  gender: CandidateGenderEnum
}

export type CandidateEducateInput = {
  id: string
  school_name: string
  major: string
  gpa: string
  start_date: string | null
  end_date: string | null
  location: string
  description: string
  attachments: NewAttachmentInput[]
  order_id: number
  is_current: boolean
}

export type CandidateAwardInput = {
  id: string
  name: string
  achieved_date: string | null
  attachments: NewAttachmentInput[]
  order_id: number
}

export type CandidateCertificateInput = {
  id: string
  name: string
  score: string
  achieved_date: string | null
  attachments: NewAttachmentInput[]
  order_id: number
}

export type CandidateExpInput = {
  id: string
  position: string
  company: string
  location: string
  start_date: string | null
  end_date: string | null
  description: string
  order_id: number
  is_current: boolean
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
  address: string
  candidate_exp: CandidateExpInput[]
  candidate_educate: CandidateEducateInput[]
  candidate_award: CandidateAwardInput[]
  candidate_certificate: CandidateCertificateInput[]
  avatar: string
  gender: CandidateGenderEnum
}

export default Candidate
