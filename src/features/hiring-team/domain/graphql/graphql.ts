import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.TEAM

  const getAllTeam = GraphQLClientService.buildQuery({
    operation: 'GetAllHiringTeams',
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
          managers {
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
      filter: 'HiringTeamFilter',
      orderBy: 'HiringTeamOrderBy!',
      freeWord: 'HiringTeamFreeWord',
    },
  })

  const createTeam = GraphQLClientService.buildQuery({
    operation: 'CreateHiringTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewHiringTeamInput!',
      note: 'String!',
    },
  })

  const updateTeam = GraphQLClientService.buildQuery({
    operation: 'UpdateHiringTeam',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateHiringTeamInput!',
      id: 'ID!',
      note: 'String!',
    },
  })

  const deleteTeam = GraphQLClientService.buildQuery({
    operation: 'DeleteHiringTeam',
    options: {
      type: 'mutation',
    },
    node: '',
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getTeamDetail = GraphQLClientService.buildQuery({
    operation: 'GetHiringTeam',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        created_at
        description
        managers {
          id
          name
          work_email
        }
        approvers {
          id
          order_id
          user_id
          user {
            name
          }
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
