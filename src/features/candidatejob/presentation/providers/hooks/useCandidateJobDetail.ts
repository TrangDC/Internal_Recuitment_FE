import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { CandidateJob } from 'features/candidatejob/domain/interfaces'
import { useMemo } from 'react'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useCandidateJobDetail = (id: String) => {
  const { getCandidateJob, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateJob.query, {
        id,
      }),
  })

  const jobApplicationDetail: CandidateJob = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateJob.operation]?.data
    }
    return {}
  }, [data])

  return {
    ...otherValue,
    jobApplicationDetail,
  }
}

export default useCandidateJobDetail
