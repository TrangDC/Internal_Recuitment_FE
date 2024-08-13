export type ParamCreateURLAttachment = {
  id: string
  folder: string
  fileName: string
  action: 'UPLOAD' | 'DOWNLOAD'
  file: File
}

export type UploadStatus = 'new' | 'uploading' | 'error' | 'success' | 'old'

export type FileUploadAttachment = {
  id: string
  document_id: string
  document_name: string
  file: File | null
  url: string
  status: UploadStatus
}

export type AttachmentValue = {
  id: string
  document_name: string
  document_id: string
}

export type ParamUploadFile = {
  status: UploadStatus
  document_id: string
}
