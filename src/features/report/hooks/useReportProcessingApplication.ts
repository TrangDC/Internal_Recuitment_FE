import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
    RangeDateColumnBar,
    ReportFilter,
} from 'shared/schema/chart/report'
import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/graphql-service'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { handleFormatLabel } from '../shared/utils/utils'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

type UseReportProcessingApplicationProps = {
    filters: ReportFilter
}

type ApplicationReportProcessing = {
    actual_interview: number
    cancel: number
    from_date: string
    to_date: string
}

const applicationLabels = {
    actual_interview: 'Actual interview',
    cancel: 'Cancelled',
}

function useReportProcessingApplication({
    filters,
}: UseReportProcessingApplicationProps) {
    const { reportProcessingApplication, queryKey } = useGraphql()
    const { data, isLoading } = useQuery({
        queryKey: [MODLUE_QUERY_KEY.REPORT_APPLICATION_PROCESSING],
        queryFn: async () =>
            GraphQLClientService.fetchGraphQL(reportProcessingApplication, {
                filter: filters,
            }),
    })

    const reportProcessingApplicationData: ApplicationReportProcessing[] = useMemo(() => {
        if (data && isRight(data)) {
            const response = unwrapEither(data)

            return response?.[reportProcessingApplication.operation]?.edges?.map(
                (item: any) => item?.node
            ) ?? []
        }
        return []
    }, [data])

    const seriesData = Object.keys(applicationLabels).reduce((acc, key) => {
        return _.set(acc, key, [])
    }, {} as any)

    const series = Object.keys(seriesData).map((key) => ({
        name: _.get(applicationLabels, key),
        data: seriesData[key],
    }))

    reportProcessingApplicationData.forEach((node) => {
        Object.keys(seriesData).forEach((key) => {
            const count = _.get(node, key, 0)
            seriesData[key].push(count)
        })
    })

    const rangeDateColumnBar: RangeDateColumnBar[] = reportProcessingApplicationData.map(
        (item) => ({
            from_date: item.from_date,
            to_date: item.to_date,
        })
    )

    const categories = handleFormatLabel(
        filters.filter_period,
        rangeDateColumnBar
    )

    return {
        reportProcessingApplicationData,
        isLoading,
        categories,
        series,
    }
}

export default useReportProcessingApplication
