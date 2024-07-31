export type PermissionData = {
  [x: string]: PermissionValue
}

export type PermissionValue = {
  ownedOnly: boolean
  teamOnly: boolean
  everything: boolean
}
