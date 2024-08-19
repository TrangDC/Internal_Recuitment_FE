import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateHistoryCallGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_HISTORY_CALL
  const createCandidateHistoryCall = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateHistoryCall',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateHistoryCallInput!',
      note: 'String!',
    },
  })

  const updateCandidateHistoryCall = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateHistoryCall',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      id: 'ID!',
      input: 'UpdateCandidateHistoryCallInput!',
      note: 'String!',
    },
  })

  const deleteCandidateHistoryCall = GraphQLClientService.buildQuery({
    operation: 'DeleteCandidateHistoryCall',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getCandidateHistoryCall = GraphQLClientService.buildQuery({
    operation: 'GetCandidateHistoryCall',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        type
        contact_to
        date
        start_time
        end_time
        description
        attachments {
          id
          document_name
          document_id
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const getAllCandidateHistoryCalls = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateHistoryCalls',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          type
          contact_to
          date
          start_time
          end_time
          edited
          description
          created_by {
            id
            name
          }
          attachments {
            id
            document_name
            document_id
          }
        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateHistoryCallFilter',
      freeWord: 'CandidateHistoryCallFreeWord',
      orderBy: 'CandidateHistoryCallOrder',
    },
  })

  return {
    createCandidateHistoryCall,
    getAllCandidateHistoryCalls,
    getCandidateHistoryCall,
    queryKey,
    updateCandidateHistoryCall,
    deleteCandidateHistoryCall,
  }
}

export default useCandidateHistoryCallGraphql
