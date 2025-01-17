import { checkDisabledActionJobButton } from 'features/jobs/shared/utils'
import { useNavigate } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import CancelIcon from 'shared/components/icons/CancelIcon'
import CloseIcon from 'shared/components/icons/CloseIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import { useBuildActionsTable } from 'shared/components/table/hooks/useBuildActionsTable'
import useTextTranslation from 'shared/constants/text'
import HiringJob from 'shared/schema/database/hiring_job'

export enum ActionAllJobsTable {
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
  CLOSE_JOB = 'close_job',
  REOPEN = 'reopen',
  CANCEL = 'cancel',
}

type UseBuildAllJobsActionsTableProps = {
  handleOpenCancel: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenClose: (id: string) => void
  handleOpenReopen: (id: string) => void
}

function useBuildAllJobsActionsTable({
  handleOpenCancel,
  handleOpenDelete,
  handleOpenClose,
  handleOpenReopen,
}: UseBuildAllJobsActionsTableProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = useBuildActionsTable<ActionAllJobsTable, HiringJob>({
    actions: {
      detail: {
        id: ActionAllJobsTable.DETAIL,
        onClick: (id, rowData) => {
          const linkNavigate =
            rowData?.status === JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS
              ? `/dashboard/job-detail/${id}`
              : `/dashboard/job-overview/${id}`

          navigate(linkNavigate)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      edit: {
        id: ActionAllJobsTable.EDIT,
        onClick: (id) => {
          navigate(`/dashboard/edit-job-request/${id}`)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
        disabled: (rowData) => {
          return checkDisabledActionJobButton('edit', rowData?.status)
        },
      },
      close_job: {
        id: ActionAllJobsTable.CLOSE_JOB,
        onClick: (id) => {
          handleOpenClose(id)
        },
        title: 'Close request',
        Icon: <CloseIcon />,
        disabled: (data) =>
          data.is_able_to_close === false ||
          checkDisabledActionJobButton('close', data?.status),
      },
      reopen: {
        id: ActionAllJobsTable.REOPEN,
        onClick: (id) => {
          handleOpenReopen(id)
        },
        title: 'Reopen Job',
        Icon: <CloseIcon />,
        disabled: (data) =>
          checkDisabledActionJobButton('reopen', data?.status),
      },
      cancel: {
        id: ActionAllJobsTable.CANCEL,
        onClick: (id) => {
          handleOpenCancel(id)
        },
        title: 'Cancel request',
        Icon: <CancelIcon />,
        disabled: (data) =>
          data.is_able_to_cancel === false ||
          checkDisabledActionJobButton('cancel', data?.status),
      },
      delete: {
        id: ActionAllJobsTable.DELETE,
        onClick: (id) => {
          handleOpenDelete(id)
        },
        title: translation.COMMON.delete,
        Icon: <DeleteIcon />,
        disabled: (data) =>
          checkDisabledActionJobButton('delete', data?.status),
      },
    },
  })
  return {
    actions,
  }
}

export default useBuildAllJobsActionsTable
