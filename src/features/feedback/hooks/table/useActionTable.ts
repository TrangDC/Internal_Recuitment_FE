import { useRef, useState } from 'react'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<CandidateJobFeedback>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openBlackList, setOpenBlackList] = useState(false)
  const [openChangeStatus, setOpenChangeStatus] = useState(false)

  function handleOpenEdit(id: string, data: CandidateJobFeedback) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenBlackList(id: string) {
    rowId.current = id
    setOpenBlackList(true)
  }

  function handleOpenChangeStatus(id: string, data: CandidateJobFeedback) {
    rowId.current = id
    rowData.current = data
    setOpenChangeStatus(true)
  }

  return {
    openCreate,
    openEdit,
    openDelete,
    openBlackList,
    openChangeStatus,
    setOpenBlackList,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
    setOpenChangeStatus,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenBlackList,
    handleOpenChangeStatus,
    rowId,
    rowData,
  }
}

export default useActionTable
