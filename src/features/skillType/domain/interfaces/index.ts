import { Skill } from "features/skill/domain/interfaces"

export type SkillType = {
  id: string
  name: string
  description: string
  skills: Skill[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export type SkillTypeInput = {
  name: string
  description: string
}

export type SkillTypeInputUpdate = SkillTypeInput & {
  note: string
}

export type entity_skill_type = SkillType  & {
  orderId: number,
  entity_skills: ( Skill & {
    orderId: number
    skill_id: string
  })[]
}