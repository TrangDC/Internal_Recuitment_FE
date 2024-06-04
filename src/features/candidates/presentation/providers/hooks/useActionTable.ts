import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openBlackList, setOpenBlackList] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
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

  return {
    openCreate,
    openEdit,
    openDelete,
    openBlackList,
    setOpenBlackList,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenBlackList,
    rowId,
    rowData,
  }
}

export default useActionTable
