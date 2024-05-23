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
          owner {
            id
            name
            work_email
          }
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

  const updateCandidateJobFeedback  = buildQuery({
    operation: 'UpdateCandidateJobFeedback',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateCandidateJobFeedbackInput!',
      id: 'ID!'
    },
  })

  const deleteCandidateJobFeedback  = buildQuery({
    operation: 'DeleteCandidateJobFeedback',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      // note: "String!"
    },
  })

  return {
    queryKey,
    getAllCandidateJobFeedbacks,
    createCandidateJobFeedback,
    updateCandidateJobFeedback,
    deleteCandidateJobFeedback
  }
}

export default useGraphql