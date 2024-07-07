import EntityPermission from './entityPermission'

interface Role {
  id: string
  name: string
  description: string
  entity_permissions: EntityPermission[]
}

export default Role
