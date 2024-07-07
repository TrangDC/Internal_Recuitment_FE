import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Skill } from 'features/skill/domain/interfaces'
import { ActionSkill } from 'features/skill/hooks/table/useBuildActionsTableSkill'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Skill>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
  rowData,
}: CheckPermissionActionTableProps<Skill>): TOptionItem<Skill>[] {
  let newActions = [...actions]
  const job = rowData.row.original
  newActions = editAction({ newActions, role })
  newActions = deleteAction({ newActions, role })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const editPermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'SKILLS',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionSkill.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'SKILLS',
  })

  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionSkill.DELETE)
  return newActions
}



export default checkPermissionActionTable
