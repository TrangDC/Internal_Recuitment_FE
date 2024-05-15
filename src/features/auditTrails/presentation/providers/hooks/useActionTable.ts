import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  function handleOpenEdit(id: string, data: T) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
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
    rowId,
    rowData,
  }
}

export default useActionTable
