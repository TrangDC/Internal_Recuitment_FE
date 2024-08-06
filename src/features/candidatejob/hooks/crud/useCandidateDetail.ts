import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import Candidate from 'shared/schema/database/candidate'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useCandidateDetail = (id: String) => {
  const { getCandidate, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [MODLUE_QUERY_KEY.CANDIDATE, queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidate, {
        id,
      }),
  })

  const candidateDetail: Candidate = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidate.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    candidateDetail,
  }
}

export default useCandidateDetail
