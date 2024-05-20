import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'interviewers'

  const getAllCandidateInterview = buildQuery({
    operation: 'GetAllCandidateInterviews',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          title
          description
          interview_date
          candidate_job_id
          start_from
          interviewer {
            id
            name
          }
          candidate_job {
            id
          }
          end_at
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
      filter: 'CandidateInterviewFilter!',
      orderBy: 'CandidateInterviewOrder', 
      freeWord: 'CandidateInterviewFreeWord',
    },
  })

  const createCandidateInterview = buildQuery({
    operation: 'CreateCandidateInterview',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewCandidateInterviewInput!',
    },
  })

  return {
    queryKey,
    // getCandidate,
    getAllCandidateInterview,
    createCandidateInterview
  }
}

export default useGraphql