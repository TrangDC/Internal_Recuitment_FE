import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.ROLE_TEMPLATE
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

  const getRole = GraphQLClientService.buildQuery({
    operation: 'GetRole',
    options: {
      type: 'query',
    },
    node: `
      data {
        id,
        name,
        description,
        entity_permissions {
          id
          for_owner
          for_team
          for_all
          permission{
            id
          }
        },
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  const createRole = GraphQLClientService.buildQuery({
    operation: 'CreateRole',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id,
      }
    `,
    params: {
      input: 'NewRoleInput!',
      note: 'String!',
    },
  })

  const updateRole = GraphQLClientService.buildQuery({
    operation: 'UpdateRole',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id,
      }
    `,
    params: {
      id: 'ID!',
      input: 'UpdateRoleInput!',
      note: 'String!',
    },
  })

  const getAllRoles = GraphQLClientService.buildQuery({
    operation: 'GetAllRoles',
    options: {
      type: 'query',
    },
    node: `
     edges {
        node {
          id,
          name,
          description
          is_able_to_delete
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
      filter: 'RoleFilter',
      freeWord: 'RoleFreeWord',
      orderBy: 'RoleOrder',
    },
  })

  const deleteRole = GraphQLClientService.buildQuery({
    operation: 'DeleteRole',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })
  return {
    getAllPermissionGroups,
    createRole,
    getAllRoles,
    queryKey,
    getRole,
    updateRole,
    deleteRole,
  }
}

export default useGraphql
