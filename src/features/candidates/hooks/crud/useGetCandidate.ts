import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import Candidate from 'shared/schema/database/candidate'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useGetCandidate = (id?: string) => {
  const { getCandidate, queryKey } = useGraphql()
  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    enabled: !!id,
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

export default useGetCandidate
