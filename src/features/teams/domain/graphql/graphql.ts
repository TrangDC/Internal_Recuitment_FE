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
      note: 'String!',
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
      note: 'String!'
    },
  })

  const deleteTeam = buildQuery({
    operation: 'DeleteTeam',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!'
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
