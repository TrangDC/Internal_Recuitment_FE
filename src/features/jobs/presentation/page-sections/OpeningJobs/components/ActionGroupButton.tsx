import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { Fragment } from 'react'
import { ActionGroupButtons } from 'shared/components/ActionGroupButtons'
import useActionTable from 'features/candidatejob/presentation/providers/hooks/useActionTable'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { DeleteCandidateJobModal } from 'features/candidatejob/presentation/page-sections'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import EditCandidateJobModal from 'features/candidatejob/presentation/page-sections/EditCandidateJobModal'
import useCandidateJobPermissionActionKanban from 'features/jobs/permission/hooks/useCandidateJobPermissionActionKanban'

interface IActionGroupButtons {
  rowId: string
  rowData: CandidateStatusItem
}

const ActionsButton = ({ rowId, rowData }: IActionGroupButtons) => {
  const { actions } = useContextChangeStatus()
  const { handleRemoveCandidate } = actions
  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
  } = useActionTable<CandidateJob>()

  const { actions: actionsColumns } = useCandidateJobPermissionActionKanban({
    handleOpenDelete,
    handleOpenEdit,
  })

  return (
    <Fragment>
      <ActionGroupButtons<CandidateStatusItem>
        rowId={rowId}
        actions={actionsColumns}
        rowData={rowData}
      />

      {openDelete && (
        <DeleteCandidateJobModal
          open={openDelete}
          setOpen={setOpenDelete}
          id={rowId}
          onSuccess={() => {
            handleRemoveCandidate(rowData?.status, rowId)
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
