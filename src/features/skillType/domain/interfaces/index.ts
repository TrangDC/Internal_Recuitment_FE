export type SkillType = {
  id: string
  name: string
  description: string
}

export type SkillTypeInput = {
  name: string
  description: string
}

export type SkillTypeInputUpdate = SkillTypeInput & {
  note: string
}