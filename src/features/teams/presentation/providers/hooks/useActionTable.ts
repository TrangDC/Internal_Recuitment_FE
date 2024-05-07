import { Team } from 'features/teams/domain/interfaces'
import { useRef, useState } from 'react'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<Team>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  function handleOpenEdit(id: string, data: Team) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string, data: Team) {
    rowId.current = id
    rowData.current = data
    setOpenDetail(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  return {
    openCreate,
    openEdit,
    openDetail,
    openDelete,
    setOpenCreate,
    setOpenDetail,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete,
    rowId,
    rowData,
  }
}

export default useActionTable
