import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB

  const getAllJob = buildQuery({
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
          created_at
          is_able_to_delete
          is_able_to_close
          total_candidates_recruited
          team {
              id
              name
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

  const createJob = buildQuery({
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

  const updateJob = buildQuery({
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

  const deleteJob = buildQuery({
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

  const getJobDetail = buildQuery({
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
        created_at
        team {
            id
            name
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

  const changeStatusJob = buildQuery({
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

  return {
    queryKey,
    getAllJob,
    createJob,
    updateJob,
    getJobDetail,
    deleteJob,
    changeStatusJob,
  }
}

export default useGraphql
