import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB

  const getAllJob = GraphQLClientService.buildQuery({
    operation: 'GetAllHiringJobs',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          description
          amount
          location
          salary_type
          salary_from
          salary_to
          currency
          priority
          status
          job_position {
            id
            name
          }
          created_at
          is_able_to_delete
          is_able_to_close
          total_candidates_recruited
          entity_skill_types {
            id
            name
            entity_skills {
              id
              name
            }
          }
          hiring_team {
              id
              name
              managers {
                id
              }
          }
          user {
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
      filter: 'HiringJobFilter',
      orderBy: 'HiringJobOrderBy!',
      freeWord: 'HiringJobFreeWord',
    },
  })

  const createJob = GraphQLClientService.buildQuery({
    operation: 'CreateHiringJob',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewHiringJobInput!',
      note: 'String!',
    },
  })

  const updateJob = GraphQLClientService.buildQuery({
    operation: 'UpdateHiringJob',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateHiringJobInput!',
      id: 'ID!',
      note: 'String!',
    },
  })

  const deleteJob = GraphQLClientService.buildQuery({
    operation: 'DeleteHiringJob',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getJobDetail = GraphQLClientService.buildQuery({
    operation: 'GetHiringJob',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        description
        amount
        location
        salary_type
        salary_from
        salary_to
        priority
        currency
        is_able_to_close
        status
        job_position_id
        job_position {
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
        created_at
        hiring_team {
            id
            name
            managers {
                id
            }
        }
        user {
          id
          name
          work_email
        }
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const changeStatusJob = GraphQLClientService.buildQuery({
    operation: 'UpdateHiringJobStatus',
    options: {
      type: 'mutation',
    },
    node: `
    data {
      id
    }`,
    params: {
      id: 'ID!',
      note: 'String!',
      status: 'HiringJobStatus!',
    },
  })

  const getCandidatesByJob = GraphQLClientService.buildQuery({
    operation: 'GetCandidateJobGroupByStatus',
    options: {
      type: 'query',
    },
    node: `
        data {
          hired {
              id
              candidate_id
              hiring_job_id
              status
              candidate {
                  id
                  name,
                  phone,
                  status,
                  
              }
              hiring_job {
                id
                name
                hiring_team {
                  id
                  name
                }
              }
              created_at
          }
          failed_cv {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          failed_interview {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          offer_lost {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          ex_staff {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          applied {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          interviewing {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
          offering {
              id
              candidate_id
              hiring_job_id
              status
               candidate {
                  id
                  name,
                  phone,
                  status,
              }
              hiring_job {
                id
                name
              }
              created_at
          }
        }
      `,
    params: {
      filter: 'CandidateJobGroupByStatusFilter!',
      orderBy: 'CandidateJobByOrder',
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

  return {
    queryKey,
    getAllJob,
    createJob,
    updateJob,
    getJobDetail,
    deleteJob,
    changeStatusJob,
    getCandidatesByJob,
    createCandidateJob,
  }
}

export default useGraphql
