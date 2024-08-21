import { useQuery } from '@tanstack/react-query'
import useCandidateInterviewGraphql from 'features/candidates/domain/graphql/candidateInterview'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import CandidateInterview from 'shared/schema/database/candidate_interview'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'
import { DEFAULT_DATE_FILTER } from 'shared/constants/constants'

type UseGetALLCandidateInterviewProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetALLCandidateInterview({
  id,
  filters,
}: UseGetALLCandidateInterviewProps) {
  const { getAllCandidateInterviews, queryKey } = useCandidateInterviewGraphql()
  const variables = {
    filter: {
      candidate_id: id,
      from_date: filters?.fromDate
        ? filters.fromDate.toISOString()
        : DEFAULT_DATE_FILTER.from,
      to_date: filters?.toDate
        ? filters.toDate.toISOString()
        : DEFAULT_DATE_FILTER.to,
    },
    orderBy: {
      field: 'created_at',
      direction: 'DESC',
    },
    freeWord: {
      title: filters.search,
    },
  }
  const { data } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateInterviews, variables),
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

  return {
    candidateInterviews,
  }
}

export default useGetALLCandidateInterview
