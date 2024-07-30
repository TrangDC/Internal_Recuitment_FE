import EntityPermission from './entity_permission'

interface Role {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

export default Role
