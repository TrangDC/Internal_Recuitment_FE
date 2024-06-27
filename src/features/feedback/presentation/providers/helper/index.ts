import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { ParamCreateURLAttachment } from 'shared/hooks/graphql/useGetUrlAttachment'
import { Attachments } from 'shared/interfaces'
import { downloadFile } from 'shared/utils/upload-file'

export const downloadOneFile = (attachment: Attachments, callback: any) => {
  if (isEmpty(attachment)) {
    toast.error('Attachment not exist!')
    return
  }

  new Promise((resolve, reject) => {
    const paramUpload: ParamCreateURLAttachment = {
      id: attachment.document_id,
      folder: 'candidate',
      fileName: attachment.document_name,
      action: 'DOWNLOAD',
    }
    resolve(callback(paramUpload))
  })
    .then((response: any) => {
      downloadFile(
        response.CreateAttachmentSASURL.url,
        attachment.document_name
      )
    })
    .catch((error) => {
      toast.error((error as Error).message)
    })
}
