import User from "./user"

interface Team {
    id: string
    name: string
    slug: string
    members: User[]
    opening_requests: number
    is_able_to_delete: boolean
    created_at: string
    updated_at: string
    deleted_at: string
  }

  export default Team;