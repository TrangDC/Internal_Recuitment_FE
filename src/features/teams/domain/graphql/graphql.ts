import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.TEAM

  const getAllTeam = GraphQLClientService.buildQuery({
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
          is_able_to_delete
          members {
            id
            name
            work_email
          }
          opening_requests
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
      orderBy: 'TeamOrderBy!',
      freeWord: 'TeamFreeWord',
    },
  })

  const createTeam = GraphQLClientService.buildQuery({
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

  const updateTeam = GraphQLClientService.buildQuery({
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

  const deleteTeam = GraphQLClientService.buildQuery({
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

  const getTeamDetail = GraphQLClientService.buildQuery({
    operation: 'GetTeam',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        created_at
        members {
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

  return {
    getAllTeam,
    queryKey,
    createTeam,
    updateTeam,
    deleteTeam,
    getTeamDetail,
  }
}

export default useGraphql
