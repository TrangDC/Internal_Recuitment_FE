import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { ParamCreateURLAttachment } from 'shared/hooks/graphql/useGetUrlAttachment'
import { Attachments } from 'shared/interfaces'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { downloadFile } from 'shared/utils/upload-file'

export const downloadOneFile = (attachment: Attachments, callback: any) => {
  if (isEmpty(attachment)) {
    toast.error('Attachment not exist!')
    return
  }

  new Promise<CustomGraphQLResponse>((resolve, reject) => {
    const paramUpload: ParamCreateURLAttachment = {
      id: attachment.document_id,
      folder: 'candidate',
      fileName: attachment.document_name,
      action: 'DOWNLOAD',
    }
    resolve(callback(paramUpload))
  })
    .then((response) => {
      if (response && isRight(response)) {
        downloadFile(
          unwrapEither(response)?.CreateAttachmentSASURL?.url ?? '',
          attachment.document_name
        )
      }
    })
    .catch((error) => {
      toast.error((error as Error).message)
    })
}
