import axios from 'axios'

export const UploadFileAttachment = async (url: string, file: File) => {
  return await axios.put(
    url,
    file,
    {
      headers: {
        'x-ms-version': '2020-04-08',
        'x-ms-blob-type': 'BlockBlob',
        'x-mock-response-name': 'Upload Blob',
        'Authorization': null
      },
    }
  )
}

