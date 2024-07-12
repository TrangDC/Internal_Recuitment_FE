import { SortDirection } from '@mui/material'

export type BaseRecord = {
  [key: string]: any
}

export interface IconSortProps {
  type: false | SortDirection
}

export interface baseInstance {
  value: string
  name: string
}

export interface ResponRefreshToken {
  accessToken: string
  email: string
  expiresAt: string
  refreshToken: string
  tokenType: string
}

export type UploadStatus = 'init' | 'uploading' | 'error' | 'success';
export type ParamUploadFile = {
  document_id: string
  file: File
  url: string
  status: UploadStatus
}

export type Attachments = {
  id: string
  document_name: string
  document_id: string
}

export interface ICreateModal {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void,
}

export interface IEditModal extends ICreateModal {
  id: string
}

export interface IDeleteModal extends ICreateModal {
  id: string
}

export interface IDetailModal<T> extends ICreateModal {
  id: string,
  rowData?: T
}

export type DATA_KEYWORD_TEMPLATE = { key: string; value: string }
