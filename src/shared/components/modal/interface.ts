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

export interface ITitle {
  title: string
  setOpen: (value: boolean) => void
  Icon?: ReactNode
  iconColor?: string
  subTitle?: string
  setOpenUpdate?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactNode
}
