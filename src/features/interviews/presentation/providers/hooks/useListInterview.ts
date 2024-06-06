import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { Interview } from 'features/interviews/domain/interfaces'
import GraphQLClientService from 'services/refactor/graphql-service'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useListInterview = (id: String) => {
  const { getAllCandidateInterview, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateInterview.query, {
        filter: {
          candidate_job_id: id,
        },
      }),
  })

  const listInterview: Interview[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getAllCandidateInterview.operation]?.edges?.map(
        (item: any) => item?.node
      )
    }
    return []
  }, [data])
  return {
    ...otherValue,
    listInterview,
  }
}

export default useListInterview
