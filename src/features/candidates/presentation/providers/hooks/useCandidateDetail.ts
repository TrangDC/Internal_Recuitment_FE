import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { Candidate } from 'features/candidates/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const useCandidateDetail = (id: String) => {
  const { getCandidate, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => fetchGraphQL<BaseRecord>(getCandidate.query, {
      id,
    }),
  })

  const candidateDetail: Candidate =
    data?.[getCandidate.operation]?.data ?? {}

  return {
    ...otherValue,
    candidateDetail,
  }
}

export default useCandidateDetail