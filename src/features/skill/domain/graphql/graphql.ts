import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL
  const getAllSkill = GraphQLClientService.buildQuery({
    operation: 'GetAllSkills',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          skill_type {
            id
            name
          }
          description
          is_able_to_delete
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
      filter: 'SkillFilter',
      orderBy: 'SkillOrder',
      freeWord: 'SkillFreeWord',
    },
  })
  const createSkill = GraphQLClientService.buildQuery({
    operation: 'CreateSkill',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'NewSkillInput!',
      note: 'String!',
    },
  })

  const updateSkill = GraphQLClientService.buildQuery({
    operation: 'UpdateSkill',
    options: {
      type: 'mutation',
    },
    node: `
      data {
        id
      }
    `,
    params: {
      input: 'UpdateSkillInput!',
      id: 'ID!',
      note: 'String!',
    },
  })

  const deleteSkill = GraphQLClientService.buildQuery({
    operation: 'DeleteSkill',
    options: {
      type: 'mutation',
    },
    node: ``,
    params: {
      id: 'ID!',
      note: 'String!',
    },
  })

  const getSkillDetail = GraphQLClientService.buildQuery({
    operation: 'GetSkill',
    options: {
      type: 'query',
    },
    node: `
      data {
        id
        name
        skill_type {
          id
          name
        }
        description
      }
    `,
    params: {
      id: 'ID!',
    },
  })

  return {
    getAllSkill,
    queryKey,
    createSkill,
    updateSkill,
    deleteSkill,
    getSkillDetail,
  }
}

export default useGraphql
