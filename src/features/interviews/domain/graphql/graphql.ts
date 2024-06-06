import GraphQLClientService from 'services/refactor/graphql-service'

const useGraphql = () => {
  const queryKey = 'interviewers'

  const getAllCandidateInterview = GraphQLClientService.buildQuery({
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
            work_email
            status
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

  const createCandidateInterview = GraphQLClientService.buildQuery({
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

  const updateCandidateInterview = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateInterview',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateCandidateInterviewInput!',
      id: 'ID!',
    },
  })

  const deleteCandidateInterview = GraphQLClientService.buildQuery({
    operation: 'DeleteCandidateInterview',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
    },
  })

  const getInterview = GraphQLClientService.buildQuery({
    operation: 'GetCandidateInterview',
    options: {
      type: 'query',
    },
    node: `
        data {  
          id
          title
          description
          interview_date
          candidate_job_id
          start_from
          interviewer {
            id
            name
            work_email
            status
          }
          candidate_job {
            id
          }
          end_at
          created_at
          updated_at
        }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    queryKey,
    updateCandidateInterview,
    getAllCandidateInterview,
    createCandidateInterview,
    deleteCandidateInterview,
    getInterview,
  }
}

export default useGraphql
