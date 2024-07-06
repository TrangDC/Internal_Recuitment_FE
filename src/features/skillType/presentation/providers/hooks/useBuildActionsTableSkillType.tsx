import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import { SkillType } from 'features/skillType/domain/interfaces'

enum ActionSkill {
  EDIT = 'edit',
  DELETE = 'delete',
}

type UseBuildActionsTableSkillTypeProps = {
  handleOpenEdit: (id: string, rowData: SkillType) => void
  handleOpenDelete: (id: string) => void
}

function useBuildActionsTableSkillType({
  handleOpenEdit,
  handleOpenDelete,
}: UseBuildActionsTableSkillTypeProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionSkill, SkillType>({
    actions: {
      edit: {
        id: ActionSkill.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionSkill.DELETE,
        onClick: (id) => {
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

export default useBuildActionsTableSkillType
