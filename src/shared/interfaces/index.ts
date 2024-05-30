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
