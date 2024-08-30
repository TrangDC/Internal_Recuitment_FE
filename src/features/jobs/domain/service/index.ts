import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

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

export async function getCountPendingApproval() {
  try {
    const data = await GraphQLClientService.fetchGraphQL(getAllJob, {
      orderBy: { direction: 'DESC', field: 'created_at' },
      filter: { status: 'pending_approvals' },
    })

    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getAllJob.operation]?.pagination?.total ?? 0
    }
    return 0
  } catch (error) {
    throw error
  }
}
