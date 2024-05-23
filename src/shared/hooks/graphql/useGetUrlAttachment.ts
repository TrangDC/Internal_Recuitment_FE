import { useMutation, useQueryClient } from '@tanstack/react-query'
import { buildQuery, fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const queryKey = 'attachments'
const createUrlGetAttachment = buildQuery({
  operation: 'CreateAttachmentSASURL',
  options: {
    type: 'mutation',
  },
  node: `
    fileName
    url
    action
    id
    `,
  params: {
    input: 'AttachmentInput!',
  },
})

export interface FileAttachment {
  id: string
  name: string
  file: File
}

export type ParamCreateURLAttachment = {
  id: string
  folder: 'candidate' | 'candidate_feedback'
  fileName: string
  action: 'DOWNLOAD' | 'UPLOAD'
  file?: File
  callback?: (data: any) => void
}

export type GetUrlFromAzure = {
  CreateAttachmentSASURL: {
    action: 'DOWNLOAD' | 'UPLOAD'
    fileName: string
    id: string
    url: string
  }
}

interface createAttachmentProps {
  callbackSuccess?: (value: any, params: ParamCreateURLAttachment) => void
}

const useGetUrlGetAttachment = (props: createAttachmentProps = {}) => {
  const { callbackSuccess } = props

  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newAttachment: ParamCreateURLAttachment) => {
      const { file, callback, ...otherValue } = newAttachment
      return fetchGraphQL<BaseRecord>(createUrlGetAttachment.query, {
        input: otherValue,
      })
    },
    onSuccess: async (data, params) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      try {
        callbackSuccess && callbackSuccess(data, params)
        params.callback && params.callback({ data, params })
      } catch (error) {
        throw error
      }
    },
  })

  const handleGetUrl = (
    value: ParamCreateURLAttachment,
    callback: (data: any) => void
  ) => {
    mutate({ ...value, callback })
  }

  const handleGetUrlDownload = async (value: ParamCreateURLAttachment) => {
    return await mutateAsync(value)
  }

  return {
    handleGetUrl,
    handleGetUrlDownload,
  }
}

export default useGetUrlGetAttachment
