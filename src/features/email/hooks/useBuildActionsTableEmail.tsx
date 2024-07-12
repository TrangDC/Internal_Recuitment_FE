import { IuseEmailsActionTableReturn } from 'features/email/hooks/useActionTable'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import EmailTemplate from 'shared/schema/database/email_template'

export enum ActionsTableEmail {
  DELETE = 'delete',
  EDIT = 'edit',
  DETAIL = 'detail',
}

function useBuildActionsTableEmail({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenDetail
}: IuseEmailsActionTableReturn) {
  const translation = useTextTranslation()
  const useBuildActionsTableReturn = useBuildActionsTable<
    ActionsTableEmail,
    EmailTemplate
  >({
    actions: {
      detail: {
        id: ActionsTableEmail.DETAIL,
        onClick: (id) => {
          handleOpenDetail(id)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionsTableEmail.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionsTableEmail.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
      },
    },
  })
  return useBuildActionsTableReturn
}

export default useBuildActionsTableEmail
