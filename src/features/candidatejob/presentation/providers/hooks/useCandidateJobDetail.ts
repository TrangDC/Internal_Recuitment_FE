import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'

const useCandidateJobDetail = (id: String) => {
  const { getCandidateJob, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => fetchGraphQL<BaseRecord>(getCandidateJob.query, {
      id,
    }),
  })

  const jobApplicationDetail: CandidateJob =
    data?.[getCandidateJob.operation]?.data ?? {}

  return {
    ...otherValue,
    jobApplicationDetail,
  }
}

export default useCandidateJobDetail