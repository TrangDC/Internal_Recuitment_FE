import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.ALL_PERMISSON_GROUPS
  const getAllPermissionGroups = GraphQLClientService.buildQuery({
    operation: 'GetAllPermissionGroups',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id,
          title,
          group_type,
          permissions {
             id
             title
             for_owner
             for_team
             for_all
             operation_name
          },
        }
      }
    `,
  })

  return {
    getAllPermissionGroups,
    queryKey,
  }
}

export default useGraphql
