import { CandidateStatusEnum } from '..'
import Attachment from './attachment'
import EntitySkillType from './entity_skill_type'
import User from './user'

type CandidateReferenceType =
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

export default Candidate
