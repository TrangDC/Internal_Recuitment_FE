import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { RoleTemplate } from 'features/role-template/domain/interfaces'
import useTextTranslation from 'shared/constants/text'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import EditIcon from 'shared/components/icons/EditIcon'

type IActionRoleTemplates = 'detail' | 'edit' | 'delete'

type UseRoleTemplatePermissionActionsTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useRoleTemplatePermissionActionsTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseRoleTemplatePermissionActionsTableProps) {
  const translation = useTextTranslation()
  const { actions } = usePermissionActionTable<
    IActionRoleTemplates,
    RoleTemplate
  >({
    actions: {
      detail: {
        id: 'detail',
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: 'edit',
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    },
    permissionActions: ({ actions, role }, utils) => {
      let newActions = [...actions]
      const cantView = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['VIEW.everything'],
        },
        module: 'ROLES_TEMPLATE',
        role: role,
      })

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'ROLES_TEMPLATE',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'ROLES_TEMPLATE',
        role: role,
      })
      if (!cantView) newActions = utils.removeAction(newActions, ['detail'])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useRoleTemplatePermissionActionsTable
