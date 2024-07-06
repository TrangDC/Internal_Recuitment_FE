import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Team } from 'features/teams/domain/interfaces'
import { ActionsTableTeams } from 'features/teams/hooks/useBuildActionsTableTeam'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Team>[]
  isOwner: boolean
  inTeam: boolean
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<Team>): TOptionItem<Team>[] {
  let newActions = [...actions]
  const isOwner =
    rowData.row.original.members.filter((member) => member.id === me?.id)
      .length > 0
  const inTeam = me?.teamId === rowData.row.original.id
  newActions = editAction({ newActions, isOwner, inTeam, role })
  newActions = deleteAction({ newActions, isOwner, inTeam, role })
  return newActions
}

function editAction({ newActions, isOwner, inTeam, role }: ActionProps) {

  const notEditPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly','EDIT.everything','EDIT.teamOnly'],
    },
    module: 'TEAMS',
  })

  const editOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly'],
    },
    module: 'TEAMS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'TEAMS',
  })
  if(!notEditPermission) return newActions.filter((action) => action.id !== ActionsTableTeams.EDIT)
    if (editTeamOnly && !inTeam)
      return newActions.filter((action) => action.id !==  ActionsTableTeams.EDIT)
  if (editOwnedOnly && !isOwner)
    return newActions.filter((action) => action.id !==  ActionsTableTeams.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deleteEveryThing = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'TEAMS',
  })
  if (!deleteEveryThing)
    return newActions.filter((action) => action.id !==  ActionsTableTeams.DELETE)
  return newActions
}

export default checkPermissionActionTable
