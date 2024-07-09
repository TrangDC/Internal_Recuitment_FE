import EntitySkillType from "./entity_skill_type"
import Team from "./team"
import User from "./user"

type LocationEnum = 'ha_noi' | 'ho_chi_minh' | 'da_nang' | 'japan' | 'singapore'
type SalaryTypeEnum = 'range' | 'up_to' | 'negotiate' | 'minimum'
type CurrencyEnum = 'vnd' | 'usd' | 'jpy'
type HiringJobStatus = 'daft' | 'opened' | 'closed'

interface HiringJob {
    id: string
    name: string
    slug: string
    description: string
    amount: number
    location: LocationEnum
    salary_type: SalaryTypeEnum
    salary_from: number
    salary_to: number
    currency: CurrencyEnum
    team: Team
    user: User
    status: HiringJobStatus
    total_candidates_recruited: number
    is_able_to_delete: boolean
    is_able_to_close: number
    priority: number
    entity_skill_types: EntitySkillType[]
    created_at: string
    updated_at: string
    deleted_at: string
  }

  export default HiringJob;