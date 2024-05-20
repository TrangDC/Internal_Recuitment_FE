import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'feedback'


  const getAllCandidateJobFeedbacks = buildQuery({
    operation: 'GetAllCandidateJobFeedbacks',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          created_by
          candidate_job_id
          feedback
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
      filter: 'CandidateJobFeedbackFilter!',
      orderBy: 'CandidateJobFeedbackOrder', 
      freeWord: 'CandidateJobFeedbackFreeWord',
    },
  })

  const createCandidateJobFeedback  = buildQuery({
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
    getAllCandidateJobFeedbacks,
    createCandidateJobFeedback
  }
}

export default useGraphql