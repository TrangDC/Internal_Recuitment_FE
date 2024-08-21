import { useQuery } from '@tanstack/react-query'
import useCandidateNoteGraphql from 'features/candidates/domain/graphql/candidateNote'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import CandidateNote from 'shared/schema/database/candidate_note'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'
import { DEFAULT_DATE_FILTER } from 'shared/constants/constants'

type UseGetAllCandidateNoteProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetAllCandidateNote({ id, filters }: UseGetAllCandidateNoteProps) {
  const { getAllCandidateNotes, queryKey } = useCandidateNoteGraphql()
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
      name: filters.search,
    },
  }

  const { data } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateNotes, variables),
  })

  const candidateNotes: CandidateNote[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllCandidateNotes.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])

  return {
    candidateNotes,
  }
}

export default useGetAllCandidateNote
