 
 export type PermissionGroup = {
    id: string
    title: string
    group_type: string
    permissions: Permission[]
  }

export type Permission = {
    id: string
    title: string
    for_owner: boolean
    for_team: boolean
    for_all: boolean
    operation_name: string
  }
  

export type EntityPermission = {
    id: string
    for_owner: boolean
    for_team: boolean
    for_all: boolean
    permission: Permission
}
  