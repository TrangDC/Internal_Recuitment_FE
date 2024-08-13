import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { ParamCreateURLAttachment } from '../types'

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

export const handleGetUrlAttachment = async (
  params: ParamCreateURLAttachment
): Promise<{ url: string; params: ParamCreateURLAttachment }> => {
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
        params,
      }
    }

    return { url: '', params }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
