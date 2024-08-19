import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import useCandidateFeedbackGraphql from 'features/candidates/domain/graphql/candidateFeedback'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import CandidateJobFeedback from 'shared/schema/database/candidate_job_feedback'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'

type UseGetALLCandidateFeedbackProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetALLCandidateFeedback({
  id,
  filters,
}: UseGetALLCandidateFeedbackProps) {
  const { getAllCandidateFeedbacks, queryKey } = useCandidateFeedbackGraphql()
  const variables = {
    filter: {
      candidate_id: id,
      created_by: filters?.fromDate ? filters.fromDate.toISOString() : undefined,
    },
    orderBy: {
      field: 'created_at',
      direction: 'DESC',
    },
    freeWord: {
      feedback: filters.search,
    },
  }

  const { data } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateFeedbacks, variables),
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
