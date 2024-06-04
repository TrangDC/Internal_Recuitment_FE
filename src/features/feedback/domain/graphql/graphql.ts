import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.FEEDBACK
  
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
          attachments {
            id 
            document_name
            document_id
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

  const getFeedback = buildQuery({
    operation: 'GetCandidateJobFeedback',
    options: {
      type: 'query',
    },
    node: `
        data {
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
    queryKey,
    getAllCandidateJobFeedbacks,
    createCandidateJobFeedback,
    updateCandidateJobFeedback,
    deleteCandidateJobFeedback,
    getFeedback
  }
}

export default useGraphql