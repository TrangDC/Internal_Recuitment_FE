import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { GroupStatusInterview } from 'features/interviews/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

const useGetCandidateJobInterview = (id: String) => {
  const { getCandidateJobInterview, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey, MODLUE_QUERY_KEY.INTERVIEWER, MODLUE_QUERY_KEY.FEEDBACK],
    queryFn: async () => fetchGraphQL<BaseRecord>(getCandidateJobInterview.query, {
      id,
    }),
  })

  const candidateJobInterview: GroupStatusInterview =
    data?.[getCandidateJobInterview.operation]?.data ?? {}

  return {
    ...otherValue,
    candidateJobInterview,
  }
}

export default useGetCandidateJobInterview