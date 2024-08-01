import { useRef, useState } from 'react'
import User from 'shared/schema/database/user'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<User>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenDetail(id: string) {
    rowId.current = id
    setOpenDetail(true)
  }

  return {
    openCreate,
    openEdit,
    setOpenCreate,
    setOpenEdit,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    rowId,
    rowData,
    openDetail,
    handleOpenDetail,
    setOpenDetail,
  }
}

export default useActionTable
