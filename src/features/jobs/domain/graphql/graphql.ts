import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'job'

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
      orderBy: 'HiringJobOrder', 
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
      id: 'ID!'
    },
  })

  return {
    queryKey,
    getAllJob,
    createJob,
    updateJob
  }
}

export default useGraphql