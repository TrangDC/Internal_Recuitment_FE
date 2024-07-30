import User from './user'

interface HiringTeam {
  id: string
  name: string
  slug: string
  managers: User[]
  opening_requests: number
  is_able_to_delete: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

export default HiringTeam
