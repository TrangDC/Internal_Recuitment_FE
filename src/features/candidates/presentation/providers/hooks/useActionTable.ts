import { Candidate } from 'features/candidates/domain/interfaces'
import { Job } from 'features/jobs/domain/interfaces'
import { useRef, useState } from 'react'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<Candidate>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenEdit<T>(id: string, data: Candidate) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string, data: Candidate) {
    rowId.current = id
    rowData.current = data
    setOpenDetail(true)
  }

  return {
    openCreate,
    openEdit,
    openDetail,
    setOpenCreate,
    setOpenDetail,
    setOpenEdit,
    handleOpenEdit,
    handleOpenDetail,
    rowId,
    rowData,
  }
}

export default useActionTable
