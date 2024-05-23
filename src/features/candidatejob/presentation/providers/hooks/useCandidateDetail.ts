import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { Candidate } from 'features/candidates/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useCandidateDetail = (id: String) => {
  const { getCandidate, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [MODLUE_QUERY_KEY.CANDIDATE, queryKey],
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