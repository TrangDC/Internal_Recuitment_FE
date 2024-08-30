import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGraphql = () => {
  const queryKey = MODLUE_QUERY_KEY.COUNT_JOB

  const getAllJob = GraphQLClientService.buildQuery({
    operation: 'GetAllHiringJobs',
    options: {
      type: 'query',
    },
    node: `
      pagination {
        total
      }
    `,
    params: {
      pagination: 'PaginationInput',
      filter: 'HiringJobFilter',
      orderBy: 'HiringJobOrderBy!',
      freeWord: 'HiringJobFreeWord',
    },
  })

  return {
    queryKey,
    getAllJob,
  }
}

export default useGraphql
