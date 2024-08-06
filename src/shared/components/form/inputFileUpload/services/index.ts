import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { ParamCreateURLAttachment } from '../types'
import { toast } from 'react-toastify'

const createUrlGetAttachment = GraphQLClientService.buildQuery({
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

const handleGetUrlAttachment = async (
  params: ParamCreateURLAttachment
): Promise<{ url: string; file: ParamCreateURLAttachment }> => {
  try {
    const { file, ...value } = params
    const response = await GraphQLClientService.fetchGraphQL(
      createUrlGetAttachment,
      {
        input: value,
      }
    )
    if (response && isRight(response)) {
      const url = unwrapEither(response)?.CreateAttachmentSASURL.url ?? ''

      return {
        url: url as string,
        file: params,
      }
    }

    return { url: '', file: params }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getAllUrlFromAzure = async (
  list_upload: ParamCreateURLAttachment[]
) => {
  const getUrlAzures = list_upload.map((fileUpload) => {
    return handleGetUrlAttachment(fileUpload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        toast.error((error as Error).message)
        return Promise.reject(error)
      })
  })

  return await Promise.all(getUrlAzures).then((values) => {
    return values
  })
}
