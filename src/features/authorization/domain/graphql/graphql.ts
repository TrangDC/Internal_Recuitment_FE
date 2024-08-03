import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.USER
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
          member_of_rec_team {
            id
          }
          member_of_hiring_team {
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
