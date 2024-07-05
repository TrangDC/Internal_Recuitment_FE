import { ReactNode } from 'react'

export interface IModal {
  open: boolean
  setOpen: (value: boolean) => void
  children?: ReactNode
  maxWidth?: number | string
  hideBackdrop?: boolean
  zIndex?: number
  Icon?: ReactNode
  handleClose?: () => void
  setOpenUpdate?: (value: boolean) => void
  title: string
  isLoading?: boolean
}

export type IWrapper = Omit<IModal, 'title'>

export interface IConfirmModal extends Omit<IModal, 'isLoading'> {
  listButton?: IButtonModal[]
  buttonMain?: IButtonModal[]
  middleContent?: ReactNode
  subContent?: string
  content?: string
}

export interface IButtonModal {
  title: string
  handleClick: () => void
  isLoading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export interface ITitle {
  title: string
  setOpen: (value: boolean) => void
  Icon?: ReactNode
  iconColor?: string
  subTitle?: string
  setOpenUpdate?: () => void
  children?: ReactNode
  EndHeader?: ReactNode
}

export interface IReasonModal extends IModal {
  subTitle?: string
  handlesubmit: (reason: string) => void
}

export interface ICreateModal {
  open: boolean
  setOpen: (value: boolean) => void
}

export interface IEditModal {
  id: string
  open: boolean
  setOpen: (value: boolean) => void
}
