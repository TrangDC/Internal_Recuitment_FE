import { useQuery } from '@tanstack/react-query'
import useCandidateFeedback from 'features/candidates/domain/graphql/candidateFeedback'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

function useGetALLCandidateFeedback(id?: string) {
  const { getAllCandidateFeedbacks, queryKey } = useCandidateFeedback()
  const { data } = useQuery({
    queryKey: [queryKey],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateFeedbacks, {
        filter: {
          candidate_id: id,
        },
        orderBy: {
          field: 'created_at',
          direction: 'DESC',
        },
      }),
  })

  const candidateFeedbacks: CandidateJobFeedback[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllCandidateFeedbacks.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])

  return {
    candidateFeedbacks,
  }
}

export default useGetALLCandidateFeedback