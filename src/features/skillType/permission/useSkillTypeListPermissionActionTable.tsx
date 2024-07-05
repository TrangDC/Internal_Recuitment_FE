import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { SkillType } from '../domain/interfaces'

type IActionSkill = 'edit' | 'delete'

type UseSkillTypeListPermissionActionTableProps = {
  handleOpenEdit: (id: string, rowData: SkillType) => void
  handleOpenDelete: (id: string) => void
}

function useSkillTypeListPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
}: UseSkillTypeListPermissionActionTableProps) {
  const translation = useTextTranslation()
  const { actions } = usePermissionActionTable<IActionSkill, SkillType>({
    actions: {
      edit: {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: 'delete',
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
    permissionActions: ({ actions, role }, utils) => {
      let newActions = [...actions]

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything'],
        },
        module: 'SKILL_TYPES',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything'],
        },
        module: 'SKILL_TYPES',
        role: role,
      })
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useSkillTypeListPermissionActionTable
