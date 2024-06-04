import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openChangeStatus, setOpenChangeStatus] = useState(false)


  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenChangeStatus(id: string, data: T) {
    rowId.current = id
    rowData.current = data
    setOpenChangeStatus(true)
  }

  return {
    openCreate,
    openDelete,
    openChangeStatus,
    setOpenCreate,
    setOpenDelete,
    setOpenChangeStatus,
    handleOpenDelete,
    handleOpenChangeStatus,
    rowId,
    rowData,
  }
}

export default useActionTable
