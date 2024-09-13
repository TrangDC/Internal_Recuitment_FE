import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import _ from 'lodash'
import { ReportFilter, RangeDateColumnBar } from 'shared/schema/chart/report'
import { handleFormatLabel } from 'features/report/shared/utils/utils'
import GraphQLClientService from 'services/graphql-service'
import { ReportApplication } from 'shared/schema/chart/aplication_column_bar_chart'

const applicationLabels = {
  ex_staff: 'Ex-staff',
  offer_lost: 'Offered lost',
  failed_interview: 'Failed Interview',
  failed_cv: 'Failed CV',
  hired: 'Hired',
  offering: 'Offering',
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
      GraphQLClientService.fetchGraphQL(getRecruitmentReport, {
        filter: filters,
      }),
  })

  const applicationReport: ReportApplication[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getRecruitmentReport.operation]?.edges?.node ?? []
      return sortData
    }
    return []
  }, [data])

  const seriesData = Object.keys(applicationLabels).reduce((acc, key) => {
    return _.set(acc, key, [])
  }, {} as any)
// console.log("seriesData", seriesData)
  applicationReport.forEach((node) => {
    Object.keys(seriesData).forEach((key) => {
      const count = _.get(node, key, 0)
      seriesData[key].push(count)
    })
  })

  const rangeDateColumnBar: RangeDateColumnBar[] = applicationReport.map(
    (item) => ({
      from_date: item.from_date,
      to_date: item.to_date,
    })
  )

  const categories = handleFormatLabel(
    filters.filter_period,
    rangeDateColumnBar
  )

  const totalCandidate = applicationReport.reduce((acc: number, current) => {
    const applied = current?.applied ?? 0
    const ex_staff = current?.ex_staff ?? 0
    const hired = current?.hired ?? 0
    const interviewing = current?.interviewing ?? 0
    const failed_cv = current?.failed_cv ?? 0;
    const failed_interview = current?.failed_interview ?? 0;
    const offer_lost = current?.offer_lost ?? 0
    const offering = current?.offering ?? 0
    const total =
      applied + ex_staff + hired + interviewing + failed_cv + failed_interview + offer_lost + offering
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
    totalCandidate,
  }
}

export default useGetRecruitmentApplication
