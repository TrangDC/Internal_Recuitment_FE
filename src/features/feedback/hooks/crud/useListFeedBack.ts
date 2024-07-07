import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { FeedBack } from 'features/feedback/domain/interfaces'

const useListFeedback = (id: String) => {
    const { getAllCandidateJobFeedbacks, queryKey } = useGraphql()

    const { data, ...otherValue } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => fetchGraphQL<BaseRecord>(getAllCandidateJobFeedbacks.query, {
            filter: {
                candidate_job_id: id,
            }
        }),
    })

    const listFeedback: FeedBack[] =
        data?.[getAllCandidateJobFeedbacks.operation]?.edges?.map((item: any) => item?.node) ?? []

    return {
        ...otherValue,
        listFeedback,
    }
}

export default useListFeedback
