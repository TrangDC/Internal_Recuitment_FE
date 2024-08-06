import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import { getPercentage } from 'shared/utils/convert-string'
import { FunnelStep } from 'shared/components/chats/funnelChart'
import {
  CandidateConversionRateReport,
  ReportFilter,
} from 'shared/schema/chart/report'
import GraphQLClientService from 'services/graphql-service'

type UseGetCandidateConversationRateReportProps = {
  filters: ReportFilter
}

function useGetCandidateConversationRateReport({
  filters,
}: UseGetCandidateConversationRateReportProps) {
  const { getCandidateConversionRateReport, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateConversionRateReport),
  })

  const candidateReport: CandidateConversionRateReport = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateConversionRateReport.operation]?.data
    }
    return null
  }, [data])

  const applied = candidateReport?.applied ?? 0
  const interviewing = candidateReport?.interviewing ?? 0
  const hired = candidateReport?.hired ?? 0
  const offering = candidateReport?.offering ?? 0

  const interviewingPercentage = getPercentage(interviewing, applied)
  const offeringPercentage = getPercentage(offering, interviewing)
  const hiredPercentage = getPercentage(hired, offering)

  const seriesData: FunnelStep[] = [
    {
      title: '100%',
      color: '#FFAF46',
    },
    {
      title: `${interviewingPercentage}%`,
      color: '#DB4E82',
    },
    {
      title: `${offeringPercentage}%`,
      color: '#2499EF',
    },
    {
      title: `${hiredPercentage}%`,
      color: '#7874FE',
    },
  ]

  return {
    series: seriesData,
    isLoading,
  }
}

export default useGetCandidateConversationRateReport
