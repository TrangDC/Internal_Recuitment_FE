import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import _ from 'lodash'
import GraphQLClientService from 'services/graphql-service'
import { ReportApplication } from 'shared/schema/chart/aplication_column_bar_chart'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { BaseRecord } from 'shared/interfaces'

const selectItems = [
    {
        value: 'all',
        title: 'All',
    },
]

function useGetAllHiringTeam(
) {
    const { getAllTeam } = useGraphql()
    const { data, isLoading } = useQuery({
        queryKey: [MODLUE_QUERY_KEY.TEAM],
        queryFn: async () =>
            GraphQLClientService.fetchGraphQL(getAllTeam, {
                orderBy: { direction: "DESC", field: "created_at" }
            }),
    })

    const listHiringTeam = useMemo(() => {
        if (data && isRight(data)) {
            const response = unwrapEither(data)
            const sortData =
                response?.[getAllTeam.operation]?.edges?.map(
                    (item: BaseRecord) => ({ value: item?.node?.id, title: item?.node?.name })
                ) ?? []
            return [...selectItems, ...sortData]
        }
        return selectItems;
    }, [data])


    return {
        listHiringTeam: listHiringTeam,
        isLoading
    }
}

export default useGetAllHiringTeam
