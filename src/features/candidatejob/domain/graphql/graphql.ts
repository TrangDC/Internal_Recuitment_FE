import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.CANDIDATE_JOB

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
          is_able_to_delete
          interview_feature
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
      input: 'UpdateCandidateJobStatus!',
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

  const getCandidateJobInterview = buildQuery({
    operation: 'GetCandidateJobGroupByInterview',
    options: {
      type: 'query',
    },
    node: `
      data {
        applied {
          interview {
            id
            title
            description
            candidate_job_id
            interview_date
            start_from
            end_at
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
            created_at
            updated_at
          }
          feedback {
            id
            created_by
            owner {
              id
              name
              work_email
            }
            feedback
            attachments {
              id
              document_name
              document_id
            }
            created_at
            updated_at
          }
        }
        interviewing {
          interview {
            id
            title
            description
            candidate_job_id
            interview_date
            start_from
            end_at
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
            created_at
            updated_at
          }
          feedback {
            id
            created_by
            owner {
              id
              name
              work_email
            }
            feedback
            attachments {
              id
              document_name
              document_id
            }
            created_at
            updated_at
          }
        }
        offering {
          interview {
            id
            title
            description
            candidate_job_id
            interview_date
            start_from
            end_at
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
            created_at
            updated_at
          }
          feedback {
            id
            created_by
            owner {
              id
              name
              work_email
            }
            feedback
            attachments {
              id
              document_name
              document_id
            }
            created_at
            updated_at
          }
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const deleteCandidateJob = buildQuery({
    operation: 'DeleteCandidateJob',
    options: {
      type: 'mutation',
    },
    node: ``,
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
    getCandidateJob,
    getCandidateJobInterview,
    deleteCandidateJob
  }
}

export default useGraphql
