import { renderValueReturn } from '.'
import { renderApprovers, renderDescription, renderListItem, renderText } from '../helper'

enum Field {
    DESCRIPTION = 'description',
    APPROVERS = 'approvers',
    MEMBERS = 'members'
}

const audit_trails_team: Record<Field, renderValueReturn> = {
    [Field.DESCRIPTION]: renderDescription,
    [Field.APPROVERS]: renderApprovers,
    [Field.MEMBERS]: renderListItem
}
export function renderFieldTeam(field: string): renderValueReturn {
    return audit_trails_team[field as Field] ?? renderText;
}

