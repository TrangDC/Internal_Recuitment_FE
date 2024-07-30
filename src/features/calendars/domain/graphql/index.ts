import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'calendar_interview'
  const getAllCandidateInterview4Calendar = GraphQLClientService.buildQuery({
    operation: 'GetAllCandidateInterview4Calendar',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          title
          interview_date
          start_from
          end_at
          status
          interviewer {
            id
          }
          candidate_job {
            hiring_job {
              hiring_team {
                id
              }
            }
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
      filter: 'CandidateInterviewCalendarFilter',
      orderBy: 'CandidateInterviewOrder',
      freeWord: 'CandidateInterviewFreeWord',
    },
  })

  const getCandidateInterview = GraphQLClientService.buildQuery({
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
        start_from
        end_at
        candidate_job_id
        location
        meeting_link
        status
        interviewer {
          id
          name
        }
        candidate_job {
          hiring_job_id
          candidate_id
          hiring_job {
            name
            hiring_team {
              name
              id
            }
          }
          candidate {
            name 
            email
            phone
          }
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const getCandidateInterviewForEdit = GraphQLClientService.buildQuery({
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
        start_from
        candidate_job_id
        end_at
        status
        interviewer {
          id
        }
        candidate_job {
          hiring_job_id
          candidate_id
          hiring_job {
            hiring_team {
              id
            }
          }
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const createCandidateInterview = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateInterview4Calendar',
    options: {
      type: 'mutation',
    },
    params: {
      input: 'NewCandidateInterview4CalendarInput!',
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
    params: {
      id: 'ID!',
    },
  })

  const updateCandidateInterviewSchedule = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateInterviewSchedule',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateCandidateInterviewScheduleInput!',
      id: 'ID!',
    },
  })

  const updateCandidateInterviewStatus = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateInterviewStatus',
    options: {
      type: 'mutation',
    },
    params: {
      id: 'ID!',
      input: 'UpdateCandidateInterviewStatusInput!',
    },
  })
  return {
    getAllCandidateInterview4Calendar,
    queryKey,
    createCandidateInterview,
    getCandidateInterview,
    updateCandidateInterview,
    getCandidateInterviewForEdit,
    deleteCandidateInterview,
    updateCandidateInterviewSchedule,
    updateCandidateInterviewStatus,
  }
}

export default useGraphql
