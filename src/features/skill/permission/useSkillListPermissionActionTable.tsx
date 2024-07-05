import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import { Skill } from '../domain/interfaces'

type IActionSkill = 'detail' | 'edit' | 'delete'

type UseSkillListPermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useSkillListPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseSkillListPermissionActionTableProps) {
  const translation = useTextTranslation()
  const { actions } = usePermissionActionTable<IActionSkill, Skill>({
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
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
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
        module: 'SKILLS',
        role: role,
      })

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'SKILLS',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'SKILLS',
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

export default useSkillListPermissionActionTable
