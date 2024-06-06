import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { GroupStatusInterview } from 'features/interviews/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useGetCandidateJobInterview = (id: String) => {
  const { getCandidateJobInterview, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, MODLUE_QUERY_KEY.INTERVIEWER, MODLUE_QUERY_KEY.FEEDBACK],
    queryFn: async () => GraphQLClientService.fetchGraphQL(getCandidateJobInterview.query, {
      id,
    }),
  })

    const candidateJobInterview: GroupStatusInterview = useMemo(() => {
      if (data && isRight(data)) {
        const response = unwrapEither(data)
        return response?.[getCandidateJobInterview.operation]?.data
      }
      return {};
    }, [data])

  return {
    ...otherValue,
    candidateJobInterview,
  }
}

export default useGetCandidateJobInterview