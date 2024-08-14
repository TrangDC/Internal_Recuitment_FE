import { useRef, useState } from 'react'
import CandidateJob from 'shared/schema/database/candidate_job'

const useActionApplicationHistory = () => {
  const rowId = useRef('')
  const rowData = useRef<CandidateJob>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openChangeStatus, setOpenChangeStatus] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenChangeStatus(id: string, data: CandidateJob) {
    rowId.current = id
    rowData.current = data
    setOpenChangeStatus(true)
  }

  function handleOpenEdit(id: string, data?: CandidateJob) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  return {
    openEdit,
    openCreate,
    openDelete,
    openChangeStatus,
    setOpenEdit,
    setOpenCreate,
    setOpenDelete,
    handleOpenEdit,
    setOpenChangeStatus,
    handleOpenDelete,
    handleOpenChangeStatus,
    rowId,
    rowData,
  }
}

export default useActionApplicationHistory
