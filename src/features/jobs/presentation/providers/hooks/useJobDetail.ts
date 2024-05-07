import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { Job } from 'features/jobs/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const useJobDetail = (id: String) => {
  const { getJobDetail, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => fetchGraphQL<BaseRecord>(getJobDetail.query, {
      id,
    }),
  })

  const jobDetail: Job =
    data?.[getJobDetail.operation]?.data ?? {}

  return {
    ...otherValue,
    jobDetail,
  }
}

export default useJobDetail
