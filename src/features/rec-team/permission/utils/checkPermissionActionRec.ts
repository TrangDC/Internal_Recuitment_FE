import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { ActionsTableRecTeams } from 'features/rec-team/hooks/table/useBuildActionsTableRec'
import { TOptionItem } from 'shared/components/ActionGroupButtons'
import RecTeam from 'shared/schema/database/rec_team'

interface ActionProps {
  newActions: TOptionItem<RecTeam>[]
  isOwner: boolean
  inTeam: boolean
  role: PermissionStructureImpl | null
}

function checkPermissionActionRecTeams({
  role,
  me,
  actions,
  rowData,
}: CheckPermissionActionTableProps<RecTeam>): TOptionItem<RecTeam>[] {
  let newActions = [...actions]
  const isOwner = rowData.row.original.leader.id === me?.id
  const inTeam = me?.rectTeamId === rowData.row.original.id
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
    module: 'REC_TEAMS',
  })

  const editOwnedOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.ownedOnly'],
    },
    module: 'REC_TEAMS',
  })

  const editTeamOnly = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.teamOnly'],
    },
    module: 'REC_TEAMS',
  })
  if (!notEditPermission)
    return newActions.filter(
      (action) => action.id !== ActionsTableRecTeams.EDIT
    )
  if (editTeamOnly && !inTeam)
    return newActions.filter(
      (action) => action.id !== ActionsTableRecTeams.EDIT
    )
  if (editOwnedOnly && !isOwner)
    return newActions.filter(
      (action) => action.id !== ActionsTableRecTeams.EDIT
    )
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deleteEveryThing = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'REC_TEAMS',
  })
  if (!deleteEveryThing)
    return newActions.filter(
      (action) => action.id !== ActionsTableRecTeams.DELETE
    )
  return newActions
}

export default checkPermissionActionRecTeams
