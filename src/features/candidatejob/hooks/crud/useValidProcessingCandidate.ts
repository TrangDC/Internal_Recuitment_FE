import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import Candidate from 'shared/schema/database/candidate'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useValidProcessingCandidate = (candidateID: String) => {
  const { validProcessingCandidateJobExistByCandidateID, queryKey } =
    useGraphql()

  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(
        validProcessingCandidateJobExistByCandidateID,
        {
          candidateID,
        }
      ),
    enabled: !!candidateID,
  })

  const isValidCandidate: Candidate = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[validProcessingCandidateJobExistByCandidateID.operation]
    }
    return false;
  }, [data])

  return {
    isValidCandidate,
  }
}

export default useValidProcessingCandidate
