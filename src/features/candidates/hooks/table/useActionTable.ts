import { useRef, useState } from 'react'

const useActionTable = <T extends object>() => {
  const rowId = useRef('')
  const rowData = useRef<T>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openBlackList, setOpenBlackList] = useState(false)
  const [openImportCV, setOpenImportCV] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string) {
    rowId.current = id
    setOpenDetail(true)
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
    openDetail,
    setOpenDetail,
    handleOpenDetail,
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
    setOpenImportCV,
    openImportCV,
  }
}

export default useActionTable
