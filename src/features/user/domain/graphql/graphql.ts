import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'hiring'
  const getAllHiringTeam = GraphQLClientService.buildQuery({
    operation: 'GetAllUsers',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          work_email
          status
          roles {
            name
            id
          }
          member_of_hiring_team {
            id
            name
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
      filter: 'UserFilter',
      orderBy: 'UserOrder',
      freeWord: 'UserFreeWord',
    },
  })

  const updateUser = GraphQLClientService.buildQuery({
    operation: 'UpdateUser',
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
      input: 'UpdateUserInput!',
      note: 'String!',
    },
  })

  const changeStatusUser = GraphQLClientService.buildQuery({
    operation: 'UpdateUserStatus',
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
      input: 'UpdateUserStatusInput!',
      note: 'String!',
    },
  })

  const getUser = GraphQLClientService.buildQuery({
    operation: 'GetUser',
    options: {
      type: 'query',
    },
    node: `
        data {
          id
          name
          work_email
          status
          member_of_hiring_team {
            id
            name
          }
          roles {
            id
            name
          }
          entity_permissions {
            id
            for_owner
            for_team
            for_all
            permission {
              id
            }
          }
        }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    getAllHiringTeam,
    queryKey,
    updateUser,
    changeStatusUser,
    getUser,
  }
}

export default useGraphql
