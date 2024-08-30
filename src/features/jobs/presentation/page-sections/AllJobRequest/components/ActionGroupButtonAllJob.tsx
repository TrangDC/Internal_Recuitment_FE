import { Fragment } from 'react'
import { ActionGroupButtons } from 'shared/components/ActionGroupButtons'
import { useContextKanbanJob } from '../context/KanbanJobContext'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import HiringJob from 'shared/schema/database/hiring_job'
import useActionTable from 'features/jobs/hooks/table/useActionTable'
import useBuildAllJobsActionsTable from 'features/jobs/hooks/table/useAllJobsPermissionActionTable'
import DeleteJobModal from '../../DeleteJobModal'
import CloseJobModal from '../../CloseJobModal'
import ReopenJobModal from '../../ReopenModal'
import CancelModal from '../../CancelModal'
import checkPermissionActionTableKanban from 'features/jobs/permission/utils/checkPermissionActionTableKanban'

interface IActionGroupButtons {
  rowId: string
  rowData: HiringJob
}

const ActionsButtonAllJob = ({ rowId, rowData }: IActionGroupButtons) => {
  const { actions } = useContextKanbanJob()
  const { refetch } = actions
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openCancel,
    setOpenCancel,
    handleOpenCancel,
    openClose,
    setOpenClose,
    handleOpenClose,
    openReopen,
    setOpenReopen,
    handleOpenReopen,
  } = useActionTable()
  const { role, user } = useAuthorization()

  const { actions: actionsColumns } = useBuildAllJobsActionsTable({
    handleOpenDelete,
    handleOpenCancel,
    handleOpenClose,
    handleOpenReopen,
  })

  const newActions = checkPermissionActionTableKanban({
    actions: actionsColumns,
    me: user,
    role,
    rowData: rowData,
  })

  return (
    <Fragment>
      <ActionGroupButtons<HiringJob>
        rowId={rowId}
        actions={newActions}
        rowData={rowData}
      />

      {openDelete && (
        <DeleteJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId}
          onSuccess={() => refetch()}
        />
      )}

      {openClose && (
        <CloseJobModal
          open={openClose}
          setOpen={setOpenClose}
          id={rowId}
          onSuccess={() => refetch()}
        />
      )}

      {openReopen && (
        <ReopenJobModal
          open={openReopen}
          setOpen={setOpenReopen}
          id={rowId}
          onSuccess={() => refetch()}
        />
      )}

      {openCancel && (
        <CancelModal
          open={openCancel}
          setOpen={setOpenCancel}
          id={rowId}
          onSuccess={() => refetch()}
        />
      )}
    </Fragment>
  )
}

export default ActionsButtonAllJob
