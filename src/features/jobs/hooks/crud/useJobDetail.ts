import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import HiringJob from 'shared/schema/database/hiring_job'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useJobDetail = (id: String) => {
  const { getJobDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getJobDetail, {
        id,
      }),
  })

  const jobDetail: HiringJob = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getJobDetail.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    jobDetail,
  }
}

export default useJobDetail
