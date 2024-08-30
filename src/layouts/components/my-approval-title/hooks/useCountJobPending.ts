import useGraphql from '../graphql/graphql'
import { useQuery } from '@tanstack/react-query'
import GraphQLClientService from 'services/graphql-service'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useCountJobPending = () => {
  const { getAllJob, queryKey } = useGraphql()
  const { user } = useAuthorization()

  const { data } = useQuery({
    gcTime: 0,
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllJob, {
        orderBy: { direction: 'DESC', field: 'created_at' },
        filter: {
          status: 'pending_approvals',
          approver_status: 'pending',
          approver_id: user?.id,
        },
      }),
  })

  const { totalRecord } = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const total = response?.[getAllJob.operation]?.pagination?.total

      return {
        totalRecord: total,
      }
    }
    return {
      totalRecord: 0,
    }
  }, [data])

  return {
    totalRecord,
  }
}

export default useCountJobPending
