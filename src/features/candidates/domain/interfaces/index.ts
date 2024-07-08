import { TYPE_REFERENCE_TYPE } from 'features/auditTrails/presentation/providers/helper'
import { entity_skill_type } from 'features/skillType/domain/interfaces'
import { Member } from 'features/teams/domain/interfaces'
import { Attachments } from 'shared/interfaces'
import { SchemaInputNote } from 'shared/schema'

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  dob: Date
  country: string
  reference_uid: string
  reference_type: TYPE_REFERENCE_TYPE
  reference_value: string
  description: string
  recruit_time: Date
  is_black_list: boolean
  last_apply_date: string
  is_able_to_delete: boolean
  reference_user: Member
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
  attachments: Attachments[]
  entity_skill_types: entity_skill_type[]
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

