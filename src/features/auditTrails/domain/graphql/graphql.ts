import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'candidateJob'

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
    queryKey,
    getCandidate,
    getAllCandidateJob,
    createCandidateJob,
  }
}

export default useGraphql
