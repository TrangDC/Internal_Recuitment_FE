import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import _ from 'lodash'
import { CandidateReport, ReportFilter } from 'shared/schema/chart/report'
import { handleFormatLabel } from 'features/report/shared/utils/utils'
import GraphQLClientService from 'services/graphql-service'

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
      GraphQLClientService.fetchGraphQL(getCandidateReport.query, {
        filter: filters,
      }),
  })

  const candidateReport: CandidateReport = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateReport.operation]?.data
    }
    return {}
  }, [data])

  const statsPerTimePeriod =
    candidateReport?.stats_by_time?.stats_per_time_period ?? []

  const seriesData = Object.keys(candidateLabels).reduce((acc, key) => {
    return _.set(acc, key, [])
  }, {} as any)

  statsPerTimePeriod.forEach((period) => {
    period?.number_by_type?.forEach((item) => {
      seriesData[item.type].push(item.number)
    })
  })

  const categories = handleFormatLabel(filters.filter_period, statsPerTimePeriod)

  const totalCandidate = statsPerTimePeriod.reduce((acc: number, current) => {
    const total = current.number_by_type.reduce((a, c) => a + c.number, 0) ?? 0
    return acc + total
  }, 0)

  const series = Object.keys(seriesData).map((key) => ({
    name: _.get(candidateLabels, key),
    data: seriesData[key],
  }))

  return {
    series,
    isLoading,
    categories,
    totalCandidate,
  }
}

export default useGetRecruitmentTrends
