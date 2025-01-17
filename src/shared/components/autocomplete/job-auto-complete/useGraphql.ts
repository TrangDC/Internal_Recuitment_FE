import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.JOB

  const getAllHiringJobs = GraphQLClientService.buildQuery({
    operation: 'SelectionHiringJobs',
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
      filter: 'HiringJobFilter',
      freeWord: 'HiringJobFreeWord',
      orderBy: 'HiringJobOrderBy!',
    },
  })

  return {
    queryKey,
    getAllHiringJobs,
  }
}

export default useGraphql
