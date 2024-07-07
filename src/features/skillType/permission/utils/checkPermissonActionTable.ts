import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { SkillType } from 'features/skillType/domain/interfaces'
import { ActionSkillType } from 'features/skillType/hooks/table/useBuildActionsTableSkillType'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<SkillType>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<SkillType>): TOptionItem<SkillType>[] {
  let newActions = [...actions]
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
    module: 'SKILL_TYPES',
  })

  if (!editPermission)
    return newActions.filter((action) => action.id !== ActionSkillType.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const deletePermission = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'SKILL_TYPES',
  })

  if (!deletePermission)
    return newActions.filter((action) => action.id !== ActionSkillType.DELETE)
  return newActions
}



export default checkPermissionActionTable
