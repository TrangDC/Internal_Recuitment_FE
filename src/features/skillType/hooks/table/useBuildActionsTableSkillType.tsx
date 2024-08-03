import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import useTextTranslation from 'shared/constants/text'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import SkillType from 'shared/schema/database/skill_type'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'

export enum ActionSkillType {
  EDIT = 'edit',
  DELETE = 'delete',
  DETAIL = 'detail',
}

type UseBuildActionsTableSkillTypeProps = {
  handleOpenEdit: (id: string, rowData: SkillType) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
}

function useBuildActionsTableSkillType({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseBuildActionsTableSkillTypeProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionSkillType, SkillType>({
    actions: {
      detail: {
        id: ActionSkillType.DETAIL,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionSkillType.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionSkillType.DELETE,
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
