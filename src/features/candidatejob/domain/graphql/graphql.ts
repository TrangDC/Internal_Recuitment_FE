import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'candidateJob'

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
          attachments {
            id
            document_id
            document_name
          }
          candidate {
            id
            name
            status
          }
          created_at
          updated_at
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

  const changeStatusCandidate = buildQuery({
    operation: 'UpdateCandidateJobStatus',
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
      status: 'CandidateJobStatus!',
    },
  })

  const createCandidateJobFeedback = buildQuery({
    operation: 'CreateCandidateJobFeedback',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateJobFeedbackInput!',
    },
  })

  return {
    queryKey,
    getCandidate,
    getAllCandidateJob,
    createCandidateJob,
    changeStatusCandidate,
    createCandidateJobFeedback
  }
}

export default useGraphql