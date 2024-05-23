import { buildQuery } from 'services/graphql-services'

const useGraphql = () => {
  const queryKey = 'hiring'
  const getAllHiringTeam = buildQuery({
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
          team {
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
  const updateUser = buildQuery({
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
      note: 'String!'
    },
  })

  const changeStatusUser = buildQuery({
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
      note: 'String!'
    },
  })

  return {
    getAllHiringTeam,
    queryKey,
    updateUser,
    changeStatusUser,
  }
}

export default useGraphql
