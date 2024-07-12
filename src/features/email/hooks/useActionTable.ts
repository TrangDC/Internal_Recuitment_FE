import { useRef, useState } from 'react'
import EmailTemplate from 'shared/schema/database/email_template'

export type IuseEmailsActionTableReturn = {
  openCreate: boolean
  openEdit: boolean
  openDelete: boolean
  openDetail: boolean
  openPreview: boolean
  setOpenCreate: (value: boolean) => void
  setOpenEdit: (value: boolean) => void
  setOpenDelete: (value: boolean) => void
  setOpenDetail: (value: boolean) => void
  setOpenPreview: (value: boolean) => void
  handleOpenEdit: (id: string) => void
  handleOpenDelete: (id: string) => void
  handleOpenDetail: (id: string) => void
  handleOpenPreview: (data: Partial<EmailTemplate>) => void
  rowId: React.MutableRefObject<string>
}

const useActionTable = () => {
  const rowId = useRef('')
  const rowData = useRef<Partial<EmailTemplate>>()
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)

  function handleOpenEdit(id: string) {
    rowId.current = id
    setOpenEdit(true)
  }

  function handleOpenDelete(id: string) {
    rowId.current = id
    setOpenDelete(true)
  }

  function handleOpenPreview(data: Partial<EmailTemplate>) {
    setOpenPreview(true)
    rowData.current = data;
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
    openPreview,
    setOpenPreview,
    handleOpenPreview,
    openDetail,
    setOpenDetail,
    handleOpenDetail,
    rowId,
    rowData,
  }
}

export default useActionTable
