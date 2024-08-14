import { useQuery } from '@tanstack/react-query'
import useCandidateInterview from 'features/candidates/domain/graphql/candidateInterview'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

function useGetALLCandidateInterview(id?: string) {
  const { getAllCandidateInterviews, queryKey } = useCandidateInterview()
  const { data } = useQuery({
    queryKey: [queryKey],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateInterviews, {
        filter: {
          candidate_id: id,
        },
        orderBy: {
          field: 'created_at',
          direction: 'DESC',
        },
      }),
  })

  const candidateInterviews: CandidateInterview[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllCandidateInterviews.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])

  console.log('candidateInterviews', candidateInterviews)
  return {
    candidateInterviews,
  }
}

export default useGetALLCandidateInterview
