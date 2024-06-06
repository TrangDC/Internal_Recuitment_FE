import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { Job } from 'features/jobs/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useJobDetail = (id: String) => {
  const { getJobDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getJobDetail.query, {
        id,
      }),
  })

  const jobDetail: Job = useMemo(() => {
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
