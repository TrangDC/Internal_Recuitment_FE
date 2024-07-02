import { CandidateStatusItem } from 'features/jobs/domain/interfaces'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { JobStatus } from 'shared/class/job-status'
import { ActionGroupButtons } from 'shared/components/ActionGroupButtons'
import DeleteIcon from 'shared/components/icons/DeleteIcon'
import EditIcon from 'shared/components/icons/EditIcon'
import SearchIconSmall from 'shared/components/icons/SearchIconSmall'
import useTextTranslation from 'shared/constants/text'
import useActionTable from 'features/candidatejob/presentation/providers/hooks/useActionTable'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { DeleteCandidateJobModal } from 'features/candidatejob/presentation/page-sections'
import { useContextChangeStatus } from '../context/ChangeStatusContext'
import EditCandidateJobModal from 'features/candidatejob/presentation/page-sections/EditCandidateJobModal'

interface IActionGroupButtons {
  rowId: string
  rowData: CandidateStatusItem
}

const { STATUS_STATE } = JobStatus

const ActionsButton = ({ rowId, rowData }: IActionGroupButtons) => {
  const translation = useTextTranslation()
  const navigate = useNavigate()

  const { actions } = useContextChangeStatus()
  const {handleRemoveCandidate} = actions;

  const {
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    openEdit,
    setOpenEdit,
    handleOpenEdit,
  } = useActionTable<CandidateJob>()

  return (
    <Fragment>
      <ActionGroupButtons<CandidateStatusItem>
        rowId={rowId}
        actions={[
          {
            id: 'detail',
            onClick: (id, data) => {
              navigate(`/dashboard/job-application-detail/${id}`)
            },
            title: translation.COMMON.detail,
            Icon: <SearchIconSmall />,
          },
          {
            id: 'edit',
            onClick: (id, rowData) => {
              handleOpenEdit(id)
            },
            title: translation.COMMON.edit,
            Icon: <EditIcon />,
            // disabled: (rowData) => {
            //   return rowData.hiring_job.status === STATUS_STATE.CLOSED
            // },
          },
          {
            id: 'delete',
            onClick: (id, data) => {
              handleOpenDelete(id)
            },
            title: translation.COMMON.delete,
            Icon: <DeleteIcon />,
          },
        ]}
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
