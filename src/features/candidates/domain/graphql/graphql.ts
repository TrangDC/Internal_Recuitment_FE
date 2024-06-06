import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE
  const getAllCandidates = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidates',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          email
          phone
          is_able_to_delete
          dob
          status
          is_black_list
          created_at
        }
      }
      pagination {
        page
        perPage
        total
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateFilter',
      orderBy: 'CandidateOrder', 
      freeWord: 'CandidateFreeWord',
    },
  })
  const createCandidate = GraphQLClientService.buildQuery({
    operation: 'CreateCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateInput!',
      note: 'String!'
    },
  })

  const updateCandidate = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidate',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateCandidateInput!',
      id: 'ID!',
      note: 'String!'
    },
  })

  const deleteCandidate = GraphQLClientService.buildQuery({
    operation: 'DeleteCandidate',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!'
    },
  })

  const blackListCandidate = GraphQLClientService.buildQuery({
    operation: 'SetBlackListCandidate',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      is_black_list: 'Boolean!',
      note: 'String!'
    },
  })

  const getCandidate = GraphQLClientService.buildQuery({
    operation: 'GetCandidate',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        email
        phone
        dob
        status
        is_black_list
        created_at
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const getAllCandidateJob = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateJobs',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          candidate_id
          hiring_job_id
          status
          created_at
        }
      }
      pagination {
        page
        perPage
        total
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'CandidateJobFilter!',
      orderBy: 'CandidateJobOrder', 
      freeWord: 'CandidateJobFreeWord',
    },
  })

  const createCandidateJob = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateJob',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateJobInput!',
    },
  })

  return {
    getAllCandidates,
    queryKey,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    blackListCandidate,
    getCandidate,
    getAllCandidateJob,
    createCandidateJob
  }
}

export default useGraphql