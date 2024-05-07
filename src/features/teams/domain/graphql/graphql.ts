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
          created_at
          members {
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
      filter: 'TeamFilter',
      orderBy: 'TeamOrder',
      freeWord: 'TeamFreeWord',
    },
  })

  const createTeam = buildQuery({
    operation: 'CreateTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewTeamInput!',
    },
  })

  const updateTeam = buildQuery({
    operation: 'UpdateTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateTeamInput!',
      id: 'ID!',
    },
  })

  const deleteTeam = buildQuery({
    operation: 'DeleteTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        
      }
    `,
    params: {
      id: 'ID!',
    },
  })


  return {
    getAllTeam,
    queryKey,
    createTeam,
    updateTeam,
    deleteTeam,
  }
}

export default useGraphql
