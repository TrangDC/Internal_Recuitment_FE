import { useRef, useState } from 'react'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'

export type UseActionHistoryCallReturn = {
  openEdit: boolean
  openDelete: boolean
  openDetail: boolean
  setOpenEdit: (data: boolean) => void
  setOpenDelete: (data: boolean) => void
  setOpenDetail: (data: boolean) => void
  handleOpenEdit: (id: string, data: CandidateHistoryCall) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
  rowId: string
  rowData?: CandidateHistoryCall
}

const useActionHistoryCall = (): UseActionHistoryCallReturn => {
  const rowId = useRef('')
  const rowData = useRef<CandidateHistoryCall>()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenEdit(id: string, data?: CandidateHistoryCall) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  function handleOpenDetail(id: string) {
    rowId.current = id
    setOpenDetail(true)
  }

  return {
    openEdit,
    openDelete,
    setOpenEdit,
    setOpenDelete,
    setOpenDetail,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    openDetail,
    rowId: rowId.current,
    rowData: rowData.current,
  }
}

export default useActionHistoryCall
