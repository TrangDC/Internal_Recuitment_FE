import { useRef, useState } from 'react'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'


export type UseActionHistoryCallReturn = {
  openEdit:boolean
  openDelete:boolean
  setOpenEdit:(data:boolean) => void,
  setOpenDelete:(data:boolean) => void,
  handleOpenEdit:(id:string , data:CandidateHistoryCall) => void,
  handleOpenDelete:(id:string) => void,
  rowId:string,
  rowData?:CandidateHistoryCall,
}

const useActionHistoryCall = ():UseActionHistoryCallReturn => {
  const rowId = useRef('')
  const rowData = useRef<CandidateHistoryCall>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openChangeStatus, setOpenChangeStatus] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenEdit(id: string, data?: CandidateHistoryCall) {
    rowId.current = id
    rowData.current = data
    setOpenEdit(true)
  }

  return {
    openEdit,
    openDelete,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    rowId:rowId.current,
    rowData:rowData.current,
  }
}

export default useActionHistoryCall
