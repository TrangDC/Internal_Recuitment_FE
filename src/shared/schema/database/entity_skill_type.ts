import EntitySkillRecord from "./entity_skill_record"


interface EntitySkillType {
    id: string
    name: string
    description: string
    orderId: number
    entity_skills: EntitySkillRecord[]
  }
  
  export default EntitySkillType