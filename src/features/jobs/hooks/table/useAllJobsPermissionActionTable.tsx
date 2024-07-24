import { Job } from 'features/jobs/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import CloseIcon from 'shared/components/icons/CloseIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'

export enum ActionAllJobsTable {
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
  CLOSE_JOB = 'close_job',
}

const { STATUS_HIRING_JOB } = JobStatus

type UseBuildAllJobsActionsTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenStatus: (id: string) => void
}

function useBuildAllJobsActionsTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenStatus,
}: UseBuildAllJobsActionsTableProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<ActionAllJobsTable, Job>({
    actions: {
      detail: {
        id: ActionAllJobsTable.DETAIL,
        onClick: (id) => {
          navigate(`/dashboard/job-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      close_job: {
        id: ActionAllJobsTable.CLOSE_JOB,
        onClick: (id) => {
          handleOpenStatus(id)
        },
        title: (rowData) => {
          return rowData.status === STATUS_HIRING_JOB.OPENED
            ? 'Close job'
            : 'Reopen Job'
        },
        disabled: (rowData) => {
          if (rowData?.status !== STATUS_HIRING_JOB.OPENED) return false
          if (
            rowData?.is_able_to_close &&
            rowData.status === STATUS_HIRING_JOB.OPENED
          )
            return false
          return true
        },
        Icon: <CloseIcon />,
      },
      edit: {
        id: ActionAllJobsTable.EDIT,
        onClick: (id, rowData) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
        disabled: (rowData) => {
          return rowData.status === STATUS_HIRING_JOB.CLOSED
        },
      },
      delete: {
        id: ActionAllJobsTable.DELETE,
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

export default useBuildAllJobsActionsTable
