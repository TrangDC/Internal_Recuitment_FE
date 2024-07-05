import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { Hiring } from '../domain/interfaces'

type IActionJobsOpen = 'edit'

type UseHiringTeamPermissionActionTableProps = {
  handleOpenEdit: (id: string, row: Hiring) => void
}

function useHiringTeamPermissionActionTable({
  handleOpenEdit,
}: UseHiringTeamPermissionActionTableProps) {
  const translation = useTextTranslation()
  const { actions } = usePermissionActionTable<IActionJobsOpen, Hiring>({
    actions: {
      edit: {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
    },
    permissionActions: ({ actions, role }, utils) => {
      let newActions = [...actions]
      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'HIRING_TEAMS',
        role: role,
      })
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useHiringTeamPermissionActionTable
