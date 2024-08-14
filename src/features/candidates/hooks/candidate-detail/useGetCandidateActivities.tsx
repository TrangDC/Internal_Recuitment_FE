import { useQuery } from '@tanstack/react-query'
import useCandidateJob from 'features/candidates/domain/graphql/candidateJob'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import CandidateActivity from 'shared/schema/database/candidate_activity'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

function useGetCandidateActivities(id?: string) {
  const { getCandidateActivities, queryKey } = useCandidateJob()
  const { data } = useQuery({
    queryKey: [queryKey],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateActivities, {
        filter: {
          candidate_id: id,
        },
        orderBy: {
          field: 'created_at',
          direction: 'DESC',
        },
      }),
  })

  const candidateActivity: CandidateActivity = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateActivities.operation]?.data
    }
    return {
      candidate_notes: [],
      candidate_history_calls: [],
      candidate_interviews: [],
    }
  }, [data])

  console.log('candidateDetail', candidateActivity)
  return {}
}

export default useGetCandidateActivities
