import { usePermissionActionTable } from 'features/authorization/hooks/usePermissionActionTable'
import { Job } from 'features/jobs/domain/interfaces'
import { useNavigate } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import CloseIcon from 'shared/components/icons/CloseIcon'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'

type IActionJobsOpen = 'detail' | 'edit' | 'delete' | 'close_job'

const { STATUS_STATE } = JobStatus

type UseAllJobsPermissionActionTableProps = {
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenStatus: (id: string) => void
}

function useAllJobsPermissionActionTable({
  handleOpenEdit,
  handleOpenDelete,
  handleOpenStatus,
}: UseAllJobsPermissionActionTableProps) {
  const translation = useTextTranslation()
  const navigate = useNavigate()
  const { actions } = usePermissionActionTable<IActionJobsOpen, Job>({
    actions: {
      detail: {
        id: 'detail',
        onClick: (id) => {
          navigate(`/dashboard/job-detail/${id}`)
        },
        title: translation.COMMON.detail,
        Icon: <SearchIconSmall />,
      },
      close_job: {
        id: 'close_job',
        onClick: (id) => {
          handleOpenStatus(id)
        },
        title: (rowData) => {
          return rowData.status === STATUS_STATE.OPENED
            ? 'Close job'
            : 'Reopen Job'
        },
        disabled: (rowData) => {
          if (rowData?.status !== STATUS_STATE.OPENED) return false
          if (
            rowData?.is_able_to_close &&
            rowData.status === STATUS_STATE.OPENED
          )
            return false
          return true
        },
        Icon: <CloseIcon />,
      },
      edit: {
        id: 'edit',
        onClick: (id, rowData) => {
          handleOpenEdit(id)
        },
        title: translation.COMMON.edit,
        Icon: <EditIcon />,
        disabled: (rowData) => {
          return rowData.status === STATUS_STATE.CLOSED
        },
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
      const cantView = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['VIEW.everything', 'VIEW.teamOnly'],
        },
        module: 'JOBS',
        role: role,
      })

      const cantCloseJob = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['CLOSE_JOB.everything', 'CLOSE_JOB.teamOnly'],
        },
        module: 'JOBS',
        role: role,
      })

      const cantEdit = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['EDIT.everything', 'EDIT.teamOnly'],
        },
        module: 'JOBS',
        role: role,
      })

      const cantDelete = utils.checkPermissions({
        checkBy: {
          compare: 'hasAny',
          permissions: ['DELETE.everything', 'DELETE.teamOnly'],
        },
        module: 'JOBS',
        role: role,
      })
      if (!cantView) newActions = utils.removeAction(newActions, ['detail'])
      if (!cantEdit) newActions = utils.removeAction(newActions, ['edit'])
      if (!cantDelete) newActions = utils.removeAction(newActions, ['delete'])
      if (!cantCloseJob)
        newActions = utils.removeAction(newActions, ['close_job'])
      return newActions
    },
  })
  return {
    actions,
  }
}

export default useAllJobsPermissionActionTable
