import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'team'
  const getAllTeam = buildQuery({
    operation: 'GetAllTeams',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          slug
          created_at
          updated_at
          deleted_at
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
      filter: 'TeamFilter',
      orderBy: 'TeamOrder', 
      freeWord: 'TeamFreeWord',
    },
  })

  const createJobTitle = buildQuery({
    operation: 'CreateJobTitle',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewJobTitleInput!',
    },
  })

  return {
    getAllTeam,
    queryKey,
    createJobTitle,
  }
}

export default useGraphql
