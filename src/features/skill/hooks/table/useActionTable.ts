import { useRef, useState } from 'react'
import Skill from 'shared/schema/database/skill'

const useActionTable =() => {
  const rowId = useRef('')
  const rowData = useRef<Skill>()
  const isAbleToDelete = useRef<boolean>(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string , value:boolean) {
    rowId.current = id
    isAbleToDelete.current = value
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
    openDetail,
    setOpenDetail,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    rowId,
    rowData,
    isAbleToDelete:isAbleToDelete.current
  }
}

export default useActionTable
