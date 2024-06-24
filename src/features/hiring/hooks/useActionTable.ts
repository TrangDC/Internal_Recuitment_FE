import { Hiring } from 'features/hiring/domain/interfaces'
import { useRef, useState } from 'react'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<Hiring>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  function handleOpenEdit(id: string, data: Hiring) {
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
    setOpenCreate,
    setOpenEdit,
    handleOpenEdit,
    openDelete,
    setOpenDelete,
    handleOpenDelete,
    rowId,
    rowData,
  }
}

export default useActionTable
