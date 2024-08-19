import { useRef, useState } from 'react'
import CandidateNote from 'shared/schema/database/candidate_note'


export type UseActionCandidateNoteReturn = {
  openEdit:boolean
  openDelete:boolean
  setOpenEdit:(data:boolean) => void,
  setOpenDelete:(data:boolean) => void,
  handleOpenEdit:(id:string , data:CandidateNote) => void,
  handleOpenDelete:(id:string) => void,
  rowId:string,
  rowData?:CandidateNote,
}

const useActionCandidateNote = ():UseActionCandidateNoteReturn => {
  const rowId = useRef('')
  const rowData = useRef<CandidateNote>()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenEdit(id: string, data: CandidateNote) {
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

export default useActionCandidateNote
