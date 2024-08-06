import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import _ from 'lodash'
import { RangeDateColumnBar, ReportFilter } from 'shared/schema/chart/report'
import { handleFormatLabel } from 'features/report/shared/utils/utils'
import GraphQLClientService from 'services/graphql-service'
import { ReportRecruitment } from 'shared/schema/chart/candidate_column_bar_chart'

const candidateLabels = {
  reference: 'Reference',
  headhunt: 'Headhunt',
  rec: 'REC',
  hiring_platform: 'Hiring Platform',
  eb: 'EB',
}

type IUseGetRecruitmentTrendsProps = {
  filters: ReportFilter
}

function useGetRecruitmentTrends({ filters }: IUseGetRecruitmentTrendsProps) {
  const { getCandidateReport, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filters],
    enabled: !!filters,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateReport, {
        filter: filters,
      }),
  })

  const candidateReport: ReportRecruitment[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getCandidateReport.operation]?.edges?.node ?? []
      return sortData
    }
    return []
  }, [data])

  const rangeDateColumnBar: RangeDateColumnBar[] = candidateReport.map(
    (item) => ({
      from_date: item.from_date,
      to_date: item.to_date,
    })
  )

  const seriesData = Object.keys(candidateLabels).reduce((acc, key) => {
    return _.set(acc, key, [])
  }, {} as any)

  candidateReport.forEach((node) => {
    Object.keys(seriesData).forEach((key) => {
      const count = _.get(node, key, 0)
      seriesData[key].push(count)
    })
  })

  const totalCandidate = candidateReport.reduce((acc: number, current) => {
    const eb = current?.eb ?? 0
    const hiring_platform = current?.hiring_platform ?? 0
    const headhunt = current?.headhunt ?? 0
    const reference = current?.reference ?? 0
    const rec = current?.rec ?? 0
    const total = hiring_platform + headhunt + reference + rec + eb
    return acc + total
  }, 0)

  const series = Object.keys(seriesData).map((key) => ({
    name: _.get(candidateLabels, key),
    data: seriesData[key],
  }))

  const categories = useMemo(() => {
    return handleFormatLabel(filters.filter_period, rangeDateColumnBar)
  }, [filters, rangeDateColumnBar])

  return {
    series,
    isLoading,
    categories,
    totalCandidate,
  }
}

export default useGetRecruitmentTrends
