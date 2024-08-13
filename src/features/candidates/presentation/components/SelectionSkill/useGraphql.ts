import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL
  const getAllSkill = GraphQLClientService.buildQuery({
    operation: 'SelectionSkills',
    options: {
      type: 'query',
    },
    node: `
      edges {
        node {
          id
          name
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
      freeWord: 'SkillFreeWord',
      orderBy: 'SkillOrder',
    },
  })

  return {
    queryKey,
    getAllSkill,
  }
}

export default useGraphql
