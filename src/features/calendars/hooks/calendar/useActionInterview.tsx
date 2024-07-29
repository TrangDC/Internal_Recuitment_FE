import { useRef, useState } from 'react'

export type UseActionInterviewReturn = {
  openCreate: boolean
  openEdit: boolean
  openDelete: boolean
  setOpenCreate: (value: boolean) => void
  setOpenEdit: (value: boolean) => void
  setOpenDelete: (value: boolean) => void
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  eventId: React.MutableRefObject<string>
  openCancelCandidateInterviewModal: boolean
  openDoneCandidateInterviewModal: boolean
  setOpenDoneCandidateInterviewModal: (value: boolean) => void
  setOpenCancelCandidateInterviewModal: (value: boolean) => void
  handleDoneCandidateInterviewStatus: (id: string) => void
  handleCancelCandidateInterviewStatus: (id: string) => void
  openDetail: boolean
  setOpenDetail: (value: boolean) => void
  handleOpenDetail: (id: string) => void
}

const useActionInterview = (): UseActionInterviewReturn => {
  const eventId = useRef('')
  const [openCreate, setOpenCreate] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [
    openCancelCandidateInterviewModal,
    setOpenCancelCandidateInterviewModal,
  ] = useState(false)
  const [openDoneCandidateInterviewModal, setOpenDoneCandidateInterviewModal] =
    useState(false)

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  function handleOpenEdit(id: string) {
    eventId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    eventId.current = id
    setOpenDelete(true)
  }

  function handleCancelCandidateInterviewStatus(id: string) {
    eventId.current = id
    setOpenCancelCandidateInterviewModal(true)
  }

  function handleDoneCandidateInterviewStatus(id: string) {
    eventId.current = id
    setOpenDoneCandidateInterviewModal(true)
  }

  function handleOpenDetail(id: string) {
    eventId.current = id
    setOpenDetail(true)
  }

  return {
    eventId,
    openEdit,
    openDelete,
    openDetail,
    handleOpenDetail,
    openCreate,
    setOpenEdit,
    setOpenDetail,
    setOpenCreate,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    openDoneCandidateInterviewModal,
    openCancelCandidateInterviewModal,
    setOpenDoneCandidateInterviewModal,
    handleDoneCandidateInterviewStatus,
    setOpenCancelCandidateInterviewModal,
    handleCancelCandidateInterviewStatus,
  }
}

export default useActionInterview
