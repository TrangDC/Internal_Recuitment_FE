import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openBlackList, setOpenBlackList] = useState(false)
  const [openChangeStatus, setOpenChangeStatus] = useState(false)


  function handleOpenEdit(id: string, data: T) {
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

  function handleOpenChangeStatus(id: string, data: T) {
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
