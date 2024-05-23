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
          hiring_job {
            id
            name
            team {
              id
              name
            }
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

  const getCandidateJob = buildQuery({
    operation: 'GetCandidateJob',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        candidate_id
        hiring_job_id
        status
        candidate {
            id
            name
            email
            phone
            dob
            status
            is_black_list
            last_apply_date
        }
        attachments {
            id
            document_name
            document_id
        }
        hiring_job {
          id
          name
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    queryKey,
    getCandidate,
    getAllCandidateJob,
    createCandidateJob,
    changeStatusCandidate,
    createCandidateJobFeedback,
    getCandidateJob
  }
}

export default useGraphql