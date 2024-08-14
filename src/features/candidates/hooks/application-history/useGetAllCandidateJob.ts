import { useQuery } from '@tanstack/react-query'
import useCandidateJob from 'features/candidates/domain/graphql/candidateJob'
import { useMemo } from 'react'
import GraphQLClientService from 'services/graphql-service'
import { BaseRecord } from 'shared/interfaces/common'
import CandidateJob from 'shared/schema/database/candidate_job'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

function useGetAllCandidateJob(candidateId?: string) {
  const { getAllCandidateJob, queryKey } = useCandidateJob()
  const variables = {
    filter: {
      candidate_id: candidateId,
    },
    orderBy: {
      direction: 'DESC',
      field: 'created_at',
    },
  }
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, variables],
    enabled: !!candidateId,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateJob, variables),
  })

  const candidateJobs: CandidateJob[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllCandidateJob.operation]?.edges?.map(
          (item: BaseRecord) => item?.node
        ) ?? []
      return sortData
    }
    return []
  }, [data])
  return {
    candidateJobs,
    isLoading,
  }
}

export default useGetAllCandidateJob
