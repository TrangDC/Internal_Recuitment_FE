import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE
  const getAllCandidates = buildQuery({
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
  const createCandidate = buildQuery({
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

  const updateCandidate = buildQuery({
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

  const deleteCandidate = buildQuery({
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

  const blackListCandidate = buildQuery({
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

  const getCandidate = buildQuery({
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

  const getAllCandidateJob = buildQuery({
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

  const createCandidateJob = buildQuery({
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