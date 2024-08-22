import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateEmailGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_EMAIL
  const getAllOutgoingEmails = GraphQLClientService.buildQuery({
    operation: 'GetAllOutgoingEmails',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          to
          subject
          content
          signature
          status
          created_at
          event

        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'OutgoingEmailFilter!',
      freeWord: 'OutgoingEmailFreeWord',
      orderBy: 'OutgoingEmailOrder',
    },
  })

  return {
    getAllOutgoingEmails,
    queryKey,
  }
}

export default useCandidateEmailGraphql
