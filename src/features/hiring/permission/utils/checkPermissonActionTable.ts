import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Hiring } from 'features/hiring/domain/interfaces'
import { ActionJobsOpen } from 'features/hiring/hooks/table/useBuildActionsTableHiringTeam'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Hiring>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<Hiring>): TOptionItem<Hiring>[] {
  let newActions = [...actions]
  newActions = editAction({ newActions, role })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'HIRING_TEAMS',
  })

  if (!everything)
    return newActions.filter((action) => action.id !== ActionJobsOpen.EDIT)
  return newActions
}

export default checkPermissionActionTable
