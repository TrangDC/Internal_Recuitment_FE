import { useRef, useState } from 'react'
import HiringJob from 'shared/schema/database/hiring_job'

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<HiringJob>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openCreateApply, setOpenCreateApply] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  const [openClose, setOpenClose] = useState(false)
  const [openReopen, setOpenReopen] = useState(false)
  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)

  function handleOpenApprove() {
    setOpenApprove(true)
  }

  function handleOpenReject() {
    setOpenReject(true)
  }

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenStatus(id: string) {
    rowId.current = id
    setOpenStatus(true)
  }

  function handleOpenCancel(id: string) {
    rowId.current = id
    setOpenCancel(true)
  }

  function handleOpenClose(id: string) {
    rowId.current = id
    setOpenClose(true)
  }

  function handleOpenReopen(id: string) {
    rowId.current = id
    setOpenReopen(true)
  }

  return {
    openCreate,
    openEdit,
    openDelete,
    setOpenCreate,
    openCreateApply,
    setOpenCreateApply,
    setOpenEdit,
    setOpenDelete,
    handleOpenEdit,
    handleOpenDelete,
    openStatus,
    setOpenStatus,
    handleOpenStatus,
    openCancel,
    setOpenCancel,
    handleOpenCancel,
    openClose,
    setOpenClose,
    handleOpenClose,
    openReopen,
    setOpenReopen,
    handleOpenReopen,
    openApprove,
    openReject,
    setOpenApprove,
    setOpenReject,
    handleOpenApprove,
    handleOpenReject,
    rowId,
    rowData,
  }
}

export default useActionTable
