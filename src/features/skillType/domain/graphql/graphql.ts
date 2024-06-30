import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL_TYPE
  const getAllSkillTypes = GraphQLClientService.buildQuery({
    operation: 'GetAllSkillTypes',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          description
          created_at
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
      filter: 'SkillTypeFilter',
      orderBy: 'SkillTypeOrder', 
      freeWord: 'SkillTypeFreeWord',
    },
  })
  const createSkillType = GraphQLClientService.buildQuery({
    operation: 'CreateSkillType',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewSkillTypeInput!',
      note: 'String!'
    },
  })

  const updateSkillType = GraphQLClientService.buildQuery({
    operation: 'UpdateSkillType',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateSkillTypeInput!',
      id: 'ID!',
      note: 'String!'
    },
  })

  const deleteSkillType = GraphQLClientService.buildQuery({
    operation: 'DeleteSkillType',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!'
    },
  })

  const getSkillType = GraphQLClientService.buildQuery({
    operation: 'GetSkillType',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        description
        created_at
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    getAllSkillTypes,
    queryKey,
    createSkillType,
    updateSkillType,
    deleteSkillType,
    getSkillType,
  }
}

export default useGraphql