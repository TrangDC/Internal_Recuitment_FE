import { renderValueReturn } from '.'
import { renderChipItem, renderText } from '../helper'

enum Field {
  ROLES = 'roles',
}

const audit_trails_users: Record<Field, renderValueReturn> = {
  [Field.ROLES]: renderChipItem,
}
export function renderFieldUsers(field: string): renderValueReturn {
  return audit_trails_users[field as Field] ?? renderText
}
