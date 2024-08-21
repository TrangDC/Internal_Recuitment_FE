import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateNoteGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_NOTE
  const createCandidateNote = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateNote',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateNoteInput!',
    },
  })

  const updateCandidateNote = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateNote',
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
      input: ' UpdateCandidateNoteInput!',
      note: 'String!',
    },
  })

  const deleteCandidateNote = GraphQLClientService.buildQuery({
    operation: 'DeleteCandidateNote',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getAllCandidateNotes = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateNotes',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          created_by {
            id
            name
            hiring_team {
              id
            }
          }
          name 
          description
          edited
          attachments{
            id
            document_name
            document_id
          }
          created_at
        }
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateNoteFilter',
      freeWord: 'CandidateNoteFreeWord',
      orderBy: 'CandidateNoteOrder',
    },
  })

  const getCandidateNote = GraphQLClientService.buildQuery({
    operation: 'GetCandidateNote',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
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

  return {
    createCandidateNote,
    getAllCandidateNotes,
    queryKey,
    deleteCandidateNote,
    getCandidateNote,
    updateCandidateNote,
  }
}

export default useCandidateNoteGraphql
