import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.REC_TEAM

  const createRecTeam = GraphQLClientService.buildQuery({
    operation: 'CreateRecTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewRecTeamInput!',
      note: 'String!',
    },
  })

  // Mock data from hiring for testing ui purposes
  const getAllRecTeam = GraphQLClientService.buildQuery({
    operation: 'GetAllRecTeams',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          created_at
          description
          leader {
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
      filter: 'RecTeamFilter',
      orderBy: 'RecTeamOrderBy!',
      freeWord: 'RecTeamFreeWord',
    },
  })

  const updateTeam = GraphQLClientService.buildQuery({
    operation: 'UpdateRecTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateRecTeamInput!',
      id: 'ID!',
      note: 'String!',
    },
  })

  const deleteTeam = GraphQLClientService.buildQuery({
    operation: 'DeleteRecTeam',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getRecTeamDetail = GraphQLClientService.buildQuery({
    operation: 'GetRecTeam',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        leader {
          id
          name
        }
        description
        created_at
        leader_id
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    getAllRecTeam,
    updateTeam,
    deleteTeam,
    getRecTeamDetail,
    createRecTeam,
    queryKey,
  }
}

export default useGraphql
