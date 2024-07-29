import { MutableRefObject, useRef, useState } from 'react'

export type UseActionInterviewReturn = {
  openCreate: boolean
  openEdit: boolean
  openDelete: boolean
  setOpenCreate: (value: boolean) => void
  setOpenDelete: (value: boolean) => void
  setOpenEdit: (value: boolean) => void
  setOpenCancelCandidateInterview: (value: boolean) => void
  setOpenDoneCandidateInterview: (value: boolean) => void
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  rowId: MutableRefObject<string>
  handleCancelCandidateInterviewStatus: (id: string) => void
  handleDoneCandidateInterviewStatus: (id: string) => void
  openCancelCandidateInterview: boolean
  openDoneCandidateInterview: boolean
}
const useActionInterview = (): UseActionInterviewReturn => {
  const rowId = useRef('')
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openCancelCandidateInterview, setOpenCancelCandidateInterview] =
    useState(false)
  const [openDoneCandidateInterview, setOpenDoneCandidateInterview] =
    useState(false)
  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleCancelCandidateInterviewStatus(id: string) {
    rowId.current = id
    setOpenCancelCandidateInterview(true)
  }

  function handleDoneCandidateInterviewStatus(id: string) {
    rowId.current = id
    setOpenDoneCandidateInterview(true)
  }

  return {
    openCreate,
    openEdit,
    openDelete,
    setOpenCreate,
    setOpenDelete,
    setOpenEdit,
    handleOpenEdit,
    handleOpenDelete,
    rowId,
    handleCancelCandidateInterviewStatus,
    handleDoneCandidateInterviewStatus,
    openCancelCandidateInterview,
    openDoneCandidateInterview,
    setOpenCancelCandidateInterview,
    setOpenDoneCandidateInterview,
  }
}

export default useActionInterview
