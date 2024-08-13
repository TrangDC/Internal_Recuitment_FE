import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL_TYPE
  const getAllSkill = GraphQLClientService.buildQuery({
    operation: 'SelectionSkillTypes',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
          skills {
            id
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
      filter: 'SkillTypeFilter',
      freeWord: 'SkillTypeFreeWord',
      orderBy: 'SkillTypeOrder',
    },
  })

  return {
    queryKey,
    getAllSkill,
  }
}

export default useGraphql
