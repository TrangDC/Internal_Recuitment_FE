import Permission from 'shared/schema/database/permission'

export type PermissionGroup = {
  id: string
  title: string
  group_type: string
  permissions: Permission[]
}
