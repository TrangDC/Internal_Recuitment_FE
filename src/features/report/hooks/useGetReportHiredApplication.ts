import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import _ from 'lodash'
import { ReportFilter } from 'shared/schema/chart/report'
import GraphQLClientService from 'services/graphql-service'
import {  ReportApplicationHired } from 'shared/schema/chart/aplication_column_bar_chart'
import useGraphql from '../domain/graphql/graphql'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { BaseRecord } from 'shared/interfaces'

const applicationLabels = {
  intern: 'Intern',
  fresher: 'Fresher',
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
  manager: 'Manager',
  director: 'Director',
}

type UseGetReportHiredApplicationProps = {
  filters: ReportFilter
}

function useGetReportHiredApplication({
  filters,
}: UseGetReportHiredApplicationProps) {
  const { reportHiredApplication } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [MODLUE_QUERY_KEY.REPORT_APPLICATION_HIRED, filters],
    enabled: !!filters,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(reportHiredApplication, {
        filter: filters,
      }),
  })

  const applicationReport: ReportApplicationHired[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[reportHiredApplication.operation]?.edges?.map((item: BaseRecord) => item.node) ?? []
      return sortData
    }
    return []
  }, [data])

  const seriesData = Object.keys(applicationLabels).reduce((acc, key) => {
    return _.set(acc, key, [])
  }, {} as any)

  applicationReport.forEach((node) => {
    Object.keys(seriesData).forEach((key) => {
      const count = _.get(node, key, 0)
      seriesData[key].push(count)
    })
  })

  const categories = applicationReport.map((item) => item?.job_position_name);

  const totalHired = applicationReport.reduce((acc: number, current) => {
    const intern = current?.intern ?? 0
    const fresher = current?.fresher ?? 0
    const junior = current?.junior ?? 0
    const middle = current?.middle ?? 0
    const senior = current?.senior ?? 0;
    const manager = current?.manager ?? 0;
    const director = current?.director ?? 0

    const total =
    intern + fresher + junior + middle + senior + manager + director
    return acc + total
  }, 0)

  const series = Object.keys(seriesData).map((key) => ({
    name: _.get(applicationLabels, key),
    data: seriesData[key],
  }))

  return {
    series,
    isLoading,
    categories,
    totalHired,
  }
}

export default useGetReportHiredApplication
