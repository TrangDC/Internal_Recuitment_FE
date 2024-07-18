import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import _ from 'lodash'
import {
  ReportStatsByTime,
  ReportFilter,
} from 'shared/schema/chart/report'
import { handleFormatLabel } from 'features/report/shared/utils/utils'
import GraphQLClientService from 'services/graphql-service'

const candidateLabels = {
  offer_lost: 'Offer lost',
  kiv: 'KIV',
  hired: 'Hired',
  interviewing: 'Interviewing',
  applied: 'Applied',
}

type UseGetRecruitmentApplicationProps = {
  filters: ReportFilter
}

function useGetRecruitmentApplication({
  filters,
}: UseGetRecruitmentApplicationProps) {
  const { getRecruitmentReport, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filters],
    enabled: !!filters,
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getRecruitmentReport.query, {
        filter: filters,
      }),
  })

  const candidateReport: ReportStatsByTime = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getRecruitmentReport.operation]?.data
    }
    return {}
  }, [data])

  const statsPerTimePeriod = candidateReport?.stats_per_time_period ?? []

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

export default useGetRecruitmentApplication
