import { useQuery } from '@tanstack/react-query'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { Interview } from 'features/interviews/domain/interfaces'

const useListInterview = (id: String) => {
    const { getAllCandidateInterview, queryKey } = useGraphql()

    const { data, ...otherValue } = useQuery({
        queryKey: [queryKey],
        queryFn: async () => fetchGraphQL<BaseRecord>(getAllCandidateInterview.query, {
            filter: {
                candidate_job_id: id,
            }
        }),
    })

    const listInterview: Interview[] =
        data?.[getAllCandidateInterview.operation]?.edges?.map((item: any) => item?.node) ?? []

    return {
        ...otherValue,
        listInterview,
    }
}

export default useListInterview
