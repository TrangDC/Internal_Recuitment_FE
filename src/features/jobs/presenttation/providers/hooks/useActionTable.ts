import { Job } from 'features/jobs/domain/interfaces'
import { useRef, useState } from 'react'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<Job>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenEdit<T>(id: string, data: Job) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string, data: Job) {
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
