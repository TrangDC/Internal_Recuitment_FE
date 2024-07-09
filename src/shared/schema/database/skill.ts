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

export default Skill
