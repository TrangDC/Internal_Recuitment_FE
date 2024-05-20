import { Attachments } from "features/candidates/domain/interfaces";
import { isEmpty } from "lodash";
import { ParamCreateURLAttachment } from "shared/hooks/graphql/useGetUrlAttachment";
import { downloadFile } from "shared/utils/utils";

export const downloadFileAttachment = (attachments: Attachments, callback: any) => {
    if (isEmpty(attachments) || !Array.isArray(attachments)) return;

    const results = attachments.map((attachment) => {
      return new Promise((resolve, reject) => {
        const paramUpload: ParamCreateURLAttachment = {
          id: attachment.document_id,
          folder: 'candidate',
          fileName: attachment.document_name,
          action: 'DOWNLOAD',
        }
        resolve(callback(paramUpload))
      }).then((response: any) => {
        return response.CreateAttachmentSASURL.url
      })
    })

    Promise.all(results).then((values) => {
      function downloadMultipleFiles(urls: string[]) {
        urls.forEach((url) => {
          downloadFile(url)
        })
      }
      downloadMultipleFiles(values);
    })
}