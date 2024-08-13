import GraphQLClientService from 'services/graphql-service'

function useGraphql() {
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
  return {
    createUrlGetAttachment,
  }
}

export default useGraphql
