import { useRef, useState } from 'react'
import HiringJob from 'shared/schema/database/hiring_job'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<HiringJob>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openCreateApply, setOpenCreateApply] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenStatus(id: string) {
    rowId.current = id
    setOpenStatus(true)
  }

  return {
    openCreate,
    openEdit,
    openDelete,
    setOpenCreate,
    openCreateApply,
    setOpenCreateApply,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    rowId,
    rowData,
  }
}

export default useActionTable
