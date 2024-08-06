import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
    openDelete,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    setOpenDetail,
    openDetail,
    rowId,
    rowData,
  }
}

export default useActionTable
