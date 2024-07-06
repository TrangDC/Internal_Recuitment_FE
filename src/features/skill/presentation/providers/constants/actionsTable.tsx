import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import { Skill } from '../../../domain/interfaces'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'

enum ActionSkill {
  EDIT = 'edit',
  DELETE = 'delete',
  DETAIL = 'detail',
}

type UseSkillListPermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useActionsTableSkill({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseSkillListPermissionActionTableProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionSkill, Skill>({
    actions: {
      detail: {
        id: ActionSkill.DETAIL,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionSkill.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionSkill.DELETE,
        onClick: (id, rowData) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })
  return {
    actions,
  }
}

export default useActionsTableSkill
