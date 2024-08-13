import { MutationKey, useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import AzureStorageService from 'services/azure-storage-services'
import GraphQLClientService from 'services/graphql-service'
import { CustomGraphQLResponse } from 'shared/interfaces/response'
import {
  AttachmentAction,
  AttachmentInput,
  AttachmentResponse,
} from 'shared/schema/database/attachment'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from './useGraphql'


type UseUploadFileProps = {
  mutationKey?: MutationKey
}

type SASURLState = 'init' | 'error' | 'success'
type SASURLCurrentApi = 'get_url' | 'upload_azure'

interface CallSASURLPayload extends AttachmentInput {
  file: File
}

interface SASURLResponse extends AttachmentResponse {
  state: SASURLState
  currentApi: SASURLCurrentApi
  file: File
}

function useUploadFile({ mutationKey }: UseUploadFileProps) {
  const {createUrlGetAttachment} = useGraphql()
  const { mutateAsync } = useMutation({
    mutationKey: mutationKey,
    gcTime:0,
    mutationFn: (payload: AttachmentInput) =>
      GraphQLClientService.fetchGraphQL(createUrlGetAttachment, {
        input:payload
      }),
  })

  async function handleUploadSASURL(attachmentInputs: CallSASURLPayload[]) {
    const state: SASURLResponse[] = []
    const saveAttach = [...attachmentInputs]
    const stackPromise: Promise<CustomGraphQLResponse>[] = []
    const uploadPromise: Promise<any>[] = []
    for (let index = 0; index < saveAttach.length; index++) {
      const attachmentInput = saveAttach[index]
      stackPromise.push(
        mutateAsync({
          action: attachmentInput.action,
          fileName: attachmentInput.fileName,
          folder: attachmentInput.folder,
          id: attachmentInput.id,
        })
      )
    }
    const dataWithUrl = await Promise.allSettled(stackPromise).then((data) => {
      return data.map((o, index) => {
        if (o.status === 'fulfilled' && isRight(o.value)) {
          const data = unwrapEither(o.value)?.[
            createUrlGetAttachment.operation
          ] as AttachmentResponse
          const stateData: SASURLResponse = {
            url: data.url,
            action: AttachmentAction.UPLOAD,
            state: 'success',
            currentApi: 'get_url',
            fileName: saveAttach[index].fileName,
            id: saveAttach[index].id,
            file: saveAttach[index].file,
          }
          return stateData
        } else {
          const stateData: SASURLResponse = {
            url: '',
            action: AttachmentAction.UPLOAD,
            state: 'error',
            currentApi: 'get_url',
            fileName: saveAttach[index].fileName,
            id: saveAttach[index].id,
            file: saveAttach[index].file,
          }
          return stateData
        }
      })
    })

    state.push(...dataWithUrl)

    for (let index = 0; index < dataWithUrl.length; index++) {
      const element = dataWithUrl[index]
      if(element.url){
        uploadPromise.push(uploadFile(element.url, element.file))
      }
    }

    await Promise.allSettled(uploadPromise).then((data) => {
      data.forEach((o, index) => {
        if (o.status === 'fulfilled') {
          const stateData: SASURLResponse = {
            url: state[index].url,
            action: AttachmentAction.UPLOAD,
            state: 'success',
            currentApi: 'upload_azure',
            fileName: saveAttach[index].fileName,
            id: saveAttach[index].id,
            file: saveAttach[index].file,
          }
          _.set(state, index, stateData)
        } else {
          const stateData: SASURLResponse = {
            url: state[index].url,
            action: AttachmentAction.UPLOAD,
            state: 'error',
            currentApi: 'upload_azure',
            fileName: saveAttach[index].fileName,
            id: saveAttach[index].id,
            file: saveAttach[index].file,
          }
          _.set(state, index, stateData)
        }
      })
    })
    return state
  }

  async function uploadFile(url: string, file: File) {
    return await AzureStorageService.uploadFileToAzure({
      url: url,
      file: file,
    })
  }

  return {
    handleUploadSASURL,
  }
}

export default useUploadFile
