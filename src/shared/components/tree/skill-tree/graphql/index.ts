import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL_TYPE
  const getAllSkillTypes = GraphQLClientService.buildQuery({
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
      filter: 'SkillTypeFilter',
      orderBy: 'SkillTypeOrder', 
      freeWord: 'SkillTypeFreeWord',
    },
  })

  return {
    getAllSkillTypes,
    queryKey,
  }
}

export default useGraphql