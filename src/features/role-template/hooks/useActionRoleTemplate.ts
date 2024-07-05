import { useRef, useState } from 'react'

const useActionRoleTemplate = () => {
  const rowId = useRef('')
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
    openDelete,
    setOpenCreate,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    openDetail,
    handleOpenDetail,
    setOpenDetail,
    rowId,
  }
}

export default useActionRoleTemplate
