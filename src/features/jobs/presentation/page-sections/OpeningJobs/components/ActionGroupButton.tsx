import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { Fragment } from 'react'
import { ActionGroupButtons } from 'shared/components/ActionGroupButtons'
import useActionTable from 'features/candidatejob/hooks/table/useActionTable'
import { DeleteCandidateJobModal } from 'features/candidatejob/presentation/page-sections'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import EditCandidateJobModal from 'features/candidatejob/presentation/page-sections/EditCandidateJobModal'
import useBuildActionsKanbanJobs from 'features/jobs/hooks/table/useBuildActionsKanbanJobs'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import checkPermissionActionKanBan from 'features/jobs/permission/utils/checkPermissionActionKanBan'
import CandidateJob from 'shared/schema/database/candidate_job'
import { useContextCandidateDetail } from '../context/CandidateDetailContext'

interface IActionGroupButtons {
  rowId: string
  rowData: CandidateStatusItem
}

const ActionsButton = ({ rowId, rowData }: IActionGroupButtons) => {
  const { actions } = useContextChangeStatus()
  const { handleRemoveCandidate } = actions
  const contextCandidateDetail = useContextCandidateDetail()
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
  } = useActionTable<CandidateJob>()
  const { role, user } = useAuthorization()
  const { actions: actionsColumns } = useBuildActionsKanbanJobs({
    handleOpenDelete,
    handleOpenEdit,
  })
  const newActions = checkPermissionActionKanBan({
    role,
    me: user,
    actions: actionsColumns,
    rowData,
  })
  return (
    <Fragment>
      <ActionGroupButtons<CandidateStatusItem>
        rowId={rowId}
        actions={newActions}
        rowData={rowData}
      />

      {openDelete && (
        <DeleteCandidateJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId}
          onSuccess={() => {
            handleRemoveCandidate(rowData?.status, rowId)
            contextCandidateDetail.actions.handleRemoveCandidate(rowData?.status, rowId)
          }}
        />
      )}

      {openEdit && (
        <EditCandidateJobModal
          open={openEdit}
          setOpen={setOpenEdit}
          candidateId={rowId}
        />
      )}
    </Fragment>
  )
}

export default ActionsButton
