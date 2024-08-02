import useTextTranslation from 'shared/constants/text'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import EditIcon from 'shared/components/icons/EditIcon'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import Role from 'shared/schema/database/role'

export enum ActionRoleTemplates {
  DEtail = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
}

type UseBuildActionsTableRoleTemplateProps = {
  handleOpenEdit: (id: string, isAbleToEdit: boolean) => void
  handleOpenDelete: (id: string, isAbleToDelete: boolean) => void
  handleOpenDetail: (id: string) => void
}

function useBuildActionsTableRoleTemplate({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail,
}: UseBuildActionsTableRoleTemplateProps) {
  const translation = useTextTranslation()
  const { actions } = useBuildActionsTable<ActionRoleTemplates, Role>({
    actions: {
      detail: {
        id: ActionRoleTemplates.DEtail,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionRoleTemplates.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id, rowData.is_able_to_delete)
        },
        title: 'Edit',
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionRoleTemplates.DELETE,
        onClick: (id, row) => {
          handleOpenDelete(id, row.is_able_to_delete)
        },
        title: 'Delete',
        Icon: <DeleteIcon />,
      },
    },
  })
  return {
    actions,
  }
}

export default useBuildActionsTableRoleTemplate
