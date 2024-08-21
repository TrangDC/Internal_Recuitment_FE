import { useQuery } from '@tanstack/react-query'
import useCandidateEmailGraphql from 'features/candidates/domain/graphql/candidateEmail'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import OutgoingEmail from 'shared/schema/database/out_going_email'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { CandidateActivityFilters } from '../filters/useActivityFilter'
import { DEFAULT_DATE_FILTER } from 'shared/constants/constants'

type UseGetALLCandidateEmailProps = {
  id: string
  filters: CandidateActivityFilters
}

function useGetALLCandidateEmail({
  id,
  filters,
}: UseGetALLCandidateEmailProps) {
  const { getAllOutgoingEmails, queryKey } = useCandidateEmailGraphql()
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
      subject: filters.search,
    },
  }

  const { data } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!id,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllOutgoingEmails, variables),
  })

  const candidateEmails: OutgoingEmail[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllOutgoingEmails.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])

  return {
    candidateEmails,
  }
}

export default useGetALLCandidateEmail
