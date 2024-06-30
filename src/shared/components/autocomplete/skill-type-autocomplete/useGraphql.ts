import { buildQuery } from 'services/graphql-services'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.SKILL_TYPE

  const getAllSkillType = buildQuery({
    operation: 'SelectionSkillTypes',
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
      filter: 'SkillTypeFilter',
      freeWord: 'SkillTypeFreeWord',
      orderBy: 'SkillTypeOrder',
    },
  })

  return {
    queryKey,
    getAllSkillType,
  }
}

export default useGraphql
