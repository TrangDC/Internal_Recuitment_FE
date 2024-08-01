import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/job-position/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import JobPosition from 'shared/schema/database/job_position'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useJobPosition = (id: String) => {
  const { getJobPosition, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getJobPosition.query, {
        id,
      }),
  })

  const job_position: JobPosition = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getJobPosition.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    job_position,
  }
}

export default useJobPosition
