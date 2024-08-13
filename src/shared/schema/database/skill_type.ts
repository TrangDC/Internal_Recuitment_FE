import { SkillSelection } from "./skill"

interface SkillType {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CreateSkillTypeArguments = {
  input: NewSkillTypeInput
  note: string
}

export type DeleteSkillTypeArguments = {
  id: string
  note: string
}

export type UpdateSkillTypeArguments = {
  id: string
  input: UpdateSkillTypeInput
  note: string
}

type NewSkillTypeInput = {
  name: string
  description: string
}

type UpdateSkillTypeInput = {
  name: string
  description: string
}

export type SkillTypeSelection = {
  id: string
  name: string
  skills: SkillSelection[]
}

export default SkillType
