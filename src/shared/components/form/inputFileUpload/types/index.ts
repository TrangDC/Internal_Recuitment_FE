import { UploadStatus } from "shared/interfaces"

type VALIDATE_MAX_FILE = {
  max: number
  msg_error: string
}

type VALIDATE_MAX_SIZE = {
  max: number
  msg_error: string
}

type VALIDATE_VALID_FILE = {
  regex: string
  msg_error: string
}

export type VALIDATE_FILES = {
  max_file?: VALIDATE_MAX_FILE
  max_size?: VALIDATE_MAX_SIZE
  is_valid?: VALIDATE_VALID_FILE
}

export type ParamCreateURLAttachment = {
  id: string
  folder: 'candidate' | 'candidate_feedback'
  fileName: string
  action: 'DOWNLOAD' | 'UPLOAD'
  file?: File
  callback?: (data: any) => void
}

export type FileUploadAttachment = {
  document_id: string
  document_name: string
  file: File
  url: string
  status: UploadStatus
}