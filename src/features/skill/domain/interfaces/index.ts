export type Skill = {
  id: string
  name: string
  description: string
  created_at: string,
}

export type SkillInput = {
  name: string
  description: string
}

export type SkillInputUpdate = SkillInput & {
  note: string
}


