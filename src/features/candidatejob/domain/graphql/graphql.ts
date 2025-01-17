import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_JOB

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
        country
        reference_type
        reference_value
        reference_user {
          id
          name
        }
        entity_skill_types {
          id
          name
          orderId
          entity_skills {
            id
            name
            orderId
            skill_id
          }
        }
        recruit_time
        description
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
          is_able_to_delete
          interview_feature
          rec_team {
            id
            name
          }
          rec_in_charge {
            id
            name
          }
          attachments {
            id
            document_id
            document_name
          }
          hiring_job {
            id
            name
            status
            hiring_team {
              id
              name
            }
          }
          candidate {
            name
            phone
            email
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
      filter: 'CandidateJobFilter',
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
        candidate_id
        interview_feature
        status
        created_at
        candidate {
          id
          name
          phone
          status
        }
        hiring_job {
          id
          is_able_to_close
          location
          name
          priority
          status
          hiring_team {
            id
            name
          }
        }
      }
    `,
    params: {
      input: 'NewCandidateJobInput!',
    },
  })

  const changeStatusCandidate = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateJobStatus',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      input: 'UpdateCandidateJobStatus!',
    },
  })

  const createCandidateJobFeedback = GraphQLClientService.buildQuery({
    operation: 'CreateCandidateJobFeedback',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
        candidate_job {
          id
          status
        }
      }
    `,
    params: {
      input: 'NewCandidateJobFeedbackInput!',
    },
  })

  const getCandidateJob = GraphQLClientService.buildQuery({
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
        created_at
        interview_feature
        onboard_date
        offer_expiration_date
        level
        rec_team {
          id
          name
        }
        rec_in_charge {
          id
          name
        }
        owner {
          id
          name
        }
        hiring_job {
          hiring_team {
            id
          }
          status
        }
        steps {
          id
          candidate_job_id
          candidate_job_status
          created_at
          updated_at
        }
        candidate {
            id
            name
            email
            phone
            dob
            status
            is_black_list
            created_at
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

  const getCandidateJobInterview = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobGroupByInterview',
    options: {
      type: 'query',
    },
    node: `
      data {
        interview {
            id
            title
            description
            candidate_job_id
            interview_date
            start_from
            end_at
            location
            meeting_link
            candidate_job_status
            status
            interviewer {
              id
              name
              work_email
            }
            owner {
              id
              name
              work_email
            }
            edit_able
            edited
            created_at
            updated_at
          }
          feedback {
            id
            created_by
            candidate_job_status
            owner {
              id
              name
              work_email
              member_of_hiring_team {
                id
              }
            }
            feedback
            attachments {
              id
              document_name
              document_id
            }
            edited
            created_at
            updated_at
          }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const deleteCandidateJob = GraphQLClientService.buildQuery({
    operation: 'DeleteCandidateJob',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
    },
  })

  const updateCandidateJob = GraphQLClientService.buildQuery({
    operation: 'UpdateCandidateJob',
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
      input: 'UpdateCandidateJobInput!',
      note: 'String',
    },
  })

  const validProcessingCandidateJobExistByCandidateID =
    GraphQLClientService.buildQuery({
      operation: 'ValidProcessingCandidateJobExistByCandidateID',
      options: {
        type: 'query',
      },
      params: {
        candidateID: 'ID!',
      },
    })

  return {
    queryKey,
    getCandidate,
    getAllCandidateJob,
    createCandidateJob,
    changeStatusCandidate,
    createCandidateJobFeedback,
    getCandidateJob,
    getCandidateJobInterview,
    deleteCandidateJob,
    updateCandidateJob,
    validProcessingCandidateJobExistByCandidateID,
  }
}

export default useGraphql
