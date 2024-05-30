import axios, { AxiosProgressEvent } from 'axios'

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
    },

  )
}

type UploadFileToAzure = {
  url: string,
  file: File,
  onProgress: (progress: number) => void,
}

export const UploadFileToAzure = async ({
  url,
  file,
  onProgress
}: UploadFileToAzure) => {
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
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        //@ts-ignore
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },

  )
}

