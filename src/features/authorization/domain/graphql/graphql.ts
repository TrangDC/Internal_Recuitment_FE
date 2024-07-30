import GraphQLClientService from 'services/graphql-service'

const useGraphql = () => {
  const queryKey = 'hiring'
  const getMe = GraphQLClientService.buildQuery({
    operation: 'GetMe',
    options: {
      type: 'query',
    },
    node: `
        data {
          id
          work_email
          name
          hiring_team {
            id
          }
          entity_permissions {
            id
            for_owner
            for_team
            for_all
            permission {
              id
              operation_name
            }
          }
        }
    `,
  })

  return {
    queryKey,
    getMe,
  }
}

export default useGraphql
