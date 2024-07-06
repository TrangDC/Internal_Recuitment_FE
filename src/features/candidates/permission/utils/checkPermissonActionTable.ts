import { checkPermissions } from 'features/authorization/domain/functions/functions'
import { CheckPermissionActionTableProps } from 'features/authorization/domain/interfaces'
import PermissionStructureImpl from 'features/authorization/domain/interfaces/permission-refactor'
import { Candidate } from 'features/candidates/domain/interfaces'
import { ActionCandidateTable } from 'features/candidates/presentation/providers/hooks/useBuildActionTableCandidate'
import { ActionCandidateTableBL } from 'features/candidates/presentation/providers/hooks/useBuildActionTableCandidateBL'
import { TOptionItem } from 'shared/components/ActionGroupButtons'

interface ActionProps {
  newActions: TOptionItem<Candidate>[]
  role: PermissionStructureImpl | null
}

function checkPermissionActionTable({
  role,
  actions,
}: CheckPermissionActionTableProps<Candidate>): TOptionItem<Candidate>[] {
  let newActions = [...actions]
  newActions = editAction({ newActions, role })
  newActions = deleteAction({ newActions, role })
  newActions = addAndRemoveBlackList({ newActions, role })
  return newActions
}

function editAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['EDIT.everything'],
    },
    module: 'CANDIDATES',
  })

  if (!everything) return newActions.filter((action) => action.id !== ActionCandidateTable.EDIT)
  return newActions
}

function deleteAction({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['DELETE.everything'],
    },
    module: 'CANDIDATES',
  })

  if (!everything) return newActions.filter((action) => action.id !== ActionCandidateTable.DELETE)
  return newActions
}

function addAndRemoveBlackList({ newActions, role }: ActionProps) {
  const everything = checkPermissions({
    role,
    checkBy: {
      compare: 'hasAny',
      permissions: ['ADD_REMOVE_BLACK_LIST.everything'],
    },
    module: 'CANDIDATES',
  })

  if (!everything)
    return newActions.filter((action) => action.id !== ActionCandidateTableBL.REMOVE_BLACK_LIST)
  return newActions
}

export default checkPermissionActionTable
