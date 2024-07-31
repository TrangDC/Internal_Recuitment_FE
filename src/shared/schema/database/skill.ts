import SkillType from './skill_type'

interface Skill {
  id: string
  name: string
  description: string
  skill_type: SkillType
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateSkillArguments = {
  input: NewSkillInput
  note: string
}

export type DeleteSkillArguments = {
  id: string
  note: string
}

type NewSkillInput = {
  name: string
  description: string
  skill_type_id: string
}

export type UpdateSkillArguments = {
  id: string
  input: UpdateSkillInput
  note: string
}

type UpdateSkillInput = {
  name: string
  description: string
  skill_type_id: string
}

export default Skill
