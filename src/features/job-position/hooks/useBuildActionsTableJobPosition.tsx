import { IuseTeamsActionTableReturn } from 'features/job-position/hooks/useActionTable'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import JobPosition from 'shared/schema/database/job_position'

export enum ActionsTableJobPosition {
  DELETE = 'delete',
  EDIT = 'edit',
  DETAIL = 'detail',
}

function useBuildActionsTableJobPosition({
  handleOpenEdit,
  handleOpenDelete,
}: IuseTeamsActionTableReturn) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const useBuildActionsTableReturn = useBuildActionsTable<
    ActionsTableJobPosition,
    JobPosition
  >({
    actions: {
      detail: {
        id: ActionsTableJobPosition.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/job-position-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionsTableJobPosition.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionsTableJobPosition.DELETE,
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

export default useBuildActionsTableJobPosition
