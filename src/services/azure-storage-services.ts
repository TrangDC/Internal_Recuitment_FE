import axios, { AxiosProgressEvent } from 'axios'

type UploadFileToAzure = {
  url: string
  file: File
  onProgress?: (progress: number) => void
}

class AzureStorageService {
  static uploadFileToAzure = async ({
    url,
    file,
    onProgress,
  }: UploadFileToAzure) => {
    return await axios.put(url, file, {
      headers: {
        'x-ms-version': '2020-04-08',
        'x-ms-blob-type': 'BlockBlob',
        'x-mock-response-name': 'Upload Blob',
        'Content-Type': file?.type,
        Authorization: null,
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        //@ts-ignore
        const progress = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
        )
        onProgress?.(progress)
      },
    })
  }
}

export default AzureStorageService
