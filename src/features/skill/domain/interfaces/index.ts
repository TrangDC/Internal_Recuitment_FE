import { SkillType } from "features/skillType/domain/interfaces"

export type Skill = {
  id: string
  name: string
  description: string
  skill_type: SkillType
  created_at: string
  updated_at: string
  deleted_at: string
}

export type SkillInput = {
  name: string
  description: string
}

export type SkillInputUpdate = SkillInput & {
  note: string
}


