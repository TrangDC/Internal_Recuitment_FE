interface Attachment {
  id: string
  document_name: string
  document_id: string
}

export enum AttachmentFolder {
  CANDIDATE = 'candidate',
}

export enum AttachmentAction {
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
}

export type AttachmentInput = {
  id: string
  folder: AttachmentFolder
  fileName: string
  action: AttachmentAction
}

export type AttachmentResponse = {
  fileName: string
  url: string
  action: AttachmentAction
  id: string
}

export default Attachment
