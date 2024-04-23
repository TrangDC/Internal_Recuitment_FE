import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenEdit(id: string, data: T) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string, data: T) {
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
