import { useMutation } from '@tanstack/react-query'
import GraphQLClientService from 'services/graphql-service'
import { AttachmentInput } from 'shared/schema/database/attachment'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from './useGraphql'

function useGetImage() {
  const { createUrlGetAttachment } = useGraphql()
  const { mutateAsync } = useMutation({
    gcTime: 0,
    mutationFn: (payload: AttachmentInput) =>
      GraphQLClientService.fetchGraphQL(createUrlGetAttachment, {
        input: payload,
      }),
  })

  async function getUrl(input: AttachmentInput) {
    if (input.id) {
      const data = await mutateAsync(input)
      if (isRight(data))
        return unwrapEither(data)?.[createUrlGetAttachment.operation]?.url
      return ''
    }
    return ''
  }
  return {
    getUrl,
  }
}

export default useGetImage
