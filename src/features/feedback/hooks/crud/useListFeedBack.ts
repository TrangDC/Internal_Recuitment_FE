import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { FeedBack } from 'features/feedback/domain/interfaces'
import GraphQLClientService from 'services/graphql-service'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

const useListFeedback = (id: String) => {
  const { getAllCandidateJobFeedbacks, queryKey } = useGraphql()

  const { data, ...otherValue } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getAllCandidateJobFeedbacks.query, {
        filter: {
          candidate_job_id: id,
        },
      }),
  })

  const listFeedback = useMemo(() => {
    if (data && isRight(data)) {
      const newData: FeedBack[] =
        unwrapEither(data)?.[getAllCandidateJobFeedbacks.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []
      return newData
    }
    return []
  }, [data])

  return {
    ...otherValue,
    listFeedback,
  }
}

export default useListFeedback
