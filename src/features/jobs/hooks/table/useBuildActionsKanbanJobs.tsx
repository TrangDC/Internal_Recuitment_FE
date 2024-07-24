import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'

export enum ActionJobsKanbanTable {
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
}

type UseBuildActionsKanbanJobsProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
}

function useBuildActionsKanbanJobs({
  handleOpenEdit,
  handleOpenDelete,
}: UseBuildActionsKanbanJobsProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<
    ActionJobsKanbanTable,
    CandidateStatusItem
  >({
    actions: {
      detail: {
        id: ActionJobsKanbanTable.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/job-application-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionJobsKanbanTable.EDIT,
        onClick: (id) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
      },
      delete: {
        id: ActionJobsKanbanTable.DELETE,
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

export default useBuildActionsKanbanJobs
