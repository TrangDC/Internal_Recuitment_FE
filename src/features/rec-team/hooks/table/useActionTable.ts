import { useRef, useState } from 'react'

export type IuseTeamsActionTableReturn = {
  openCreate: boolean
  openEdit: boolean
  openDelete: boolean
  setOpenCreate: (value: boolean) => void
  setOpenEdit: (value: boolean) => void
  setOpenDelete: (value: boolean) => void
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  rowId: React.MutableRefObject<string>
}

const useActionTable = (): IuseTeamsActionTableReturn => {
  const rowId = useRef('')
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
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
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    rowId,
  }
}

export default useActionTable
