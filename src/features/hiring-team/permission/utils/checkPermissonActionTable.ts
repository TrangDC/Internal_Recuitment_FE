import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionsTableTeams } from 'features/hiring-team/hooks/table/useBuildActionsTableTeam'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import HiringTeam from 'shared/schema/database/hiring_team'

interface ActionProps {
  newActions: TOptionItem<HiringTeam>[]
  isOwner: boolean
  inTeam: boolean
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<HiringTeam>): TOptionItem<HiringTeam>[] {
  let newActions = [...actions]

  const isOwner =
    rowData.row.original.managers.filter((manager) => manager.id === me?.id)
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
      permissions: ['EDIT.ownedOnly', 'EDIT.everything', 'EDIT.teamOnly'],
    },
    module: 'HIRING_TEAMS',
  })

  const editOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly'],
    },
    module: 'HIRING_TEAMS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'HIRING_TEAMS',
  })
  if (!notEditPermission)
    return newActions.filter((action) => action.id !== ActionsTableTeams.EDIT)
  if (editTeamOnly && !inTeam)
    return newActions.filter((action) => action.id !== ActionsTableTeams.EDIT)
  if (editOwnedOnly && !isOwner)
    return newActions.filter((action) => action.id !== ActionsTableTeams.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deleteEveryThing = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'HIRING_TEAMS',
  })
  if (!deleteEveryThing)
    return newActions.filter((action) => action.id !== ActionsTableTeams.DELETE)
  return newActions
}

export default checkPermissionActionTable
