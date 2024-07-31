export type SkillTypeTree = {
    id: string
    name: string
    description: string
    skills: SkillTree[]
  }
  
  export type SkillTree = {
    id: string
    name: string
    description: string
    skill_type: SkillTypeTree
  }
  