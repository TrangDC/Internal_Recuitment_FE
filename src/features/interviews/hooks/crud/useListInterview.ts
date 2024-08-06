import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useListInterview = (id: String) => {
  const { getAllCandidateInterview, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateInterview, {
        filter: {
          candidate_job_id: id,
        },
      }),
  })

  const listInterview: CandidateInterview[] = useMemo(() => {
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
