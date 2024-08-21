import { useQuery } from '@tanstack/react-query'
import useCandidateHistoryCallGraphql from 'features/candidates/domain/graphql/candidateHistoryCall'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import { CandidateHistoryCall } from 'shared/schema/database/candidate_history_calls'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'

type UseGetALLCandidateHistoryCallProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetALLCandidateHistoryCall({
  id,
  filters,
}: UseGetALLCandidateHistoryCallProps) {
  const { getAllCandidateHistoryCalls, queryKey } =
    useCandidateHistoryCallGraphql()
  const variables = {
    filter: {
      candidate_id: id,
      from_date: filters?.fromDate
        ? filters.fromDate.toISOString()
        : undefined,
      to_date: filters?.toDate
        ? filters.toDate.toISOString()
        : undefined,
    },
    orderBy: {
      field: 'created_at',
      direction: 'DESC',
    },
    freeWord: {
      name: filters.search,
    },
  }
  const { data } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateHistoryCalls, variables),
  })

  const candidateHistoryCalls: CandidateHistoryCall[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllCandidateHistoryCalls.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])

  return {
    candidateHistoryCalls,
  }
}

export default useGetALLCandidateHistoryCall
