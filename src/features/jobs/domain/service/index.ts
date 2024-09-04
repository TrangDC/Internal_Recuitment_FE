import { useQuery } from '@tanstack/react-query'
import GraphQLClientService from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import { useMemo } from 'react'

export const useCountPendingApproval = () => {
  const { countPendingJob, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(countPendingJob, {
        orderBy: { direction: 'DESC', field: 'created_at' },
        filter: { status: 'pending_approvals' },
      }),
  })

  const countPendingApproval: number = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[countPendingJob.operation]?.pagination?.total
    }
    return 0
  }, [data])

  return {
    ...otherValue,
    countPendingApproval: countPendingApproval,
  }
}
