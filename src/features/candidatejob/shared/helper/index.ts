import { isEmpty, reject } from 'lodash'
import { toast } from 'react-toastify'
import { ParamCreateURLAttachment } from 'shared/hooks/graphql/useGetUrlAttachment'
import { Attachments } from 'shared/interfaces'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { downloadFile, downloadPdf } from 'shared/utils/upload-file'

export const downloadFileAttachment = (
  attachments: Attachments[],
  callback: any
) => {
  if (isEmpty(attachments) || !Array.isArray(attachments)) {
    toast.error('Attachment not exist!')
    return
  }

  const results = attachments.map((attachment) => {
    return new Promise((resolve, reject) => {
      const paramUpload: ParamCreateURLAttachment = {
        id: attachment.document_id,
        folder: 'candidate',
        fileName: attachment.document_name,
        action: 'DOWNLOAD',
      }
      resolve(callback(paramUpload))
    })
      .then((response: any) => {
        if (isRight(response)) {
          const urlFile =
            //@ts-ignore
            unwrapEither(response)?.['CreateAttachmentSASURL']?.url ?? ''
          return urlFile
        }
      })
      .catch((error) => {
        toast.error((error as Error).message)
        reject(error)
      })
  })

  Promise.all(results).then((values) => {
    function downloadMultipleFiles(urls: string[]) {
      urls.forEach((url) => {
        downloadPdf(url)
      })
    }
    downloadMultipleFiles(values)
  })
}

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
    .then((response: CustomGraphQLResponse) => {
      if (response && isRight(response)) {
        downloadFile(
          unwrapEither(response)?.CreateAttachmentSASURL.url,
          attachment.document_name
        )
      }
    })
    .catch((error) => {
      toast.error((error as Error).message)
      reject(error)
    })
}
