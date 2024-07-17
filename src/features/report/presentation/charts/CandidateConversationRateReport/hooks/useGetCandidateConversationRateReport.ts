import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import { getPercentage } from 'shared/utils/convert-string'
import { FunnelStep } from 'shared/components/chats/funnelChart'
import {
  CandidateJobStepByCandidateJobStatus,
  ReportFilter,
} from 'shared/schema/chart/report'
import GraphQLClientService from 'services/graphql-service'

function getInterviewingPercentage(applied: number, interviewing: number) {
  return getPercentage(interviewing, applied)
}

function getOfferingPercentage(interviewing: number, offering: number) {
  return getPercentage(offering, interviewing)
}

function getHiredPercentage(offering: number, hired: number) {
  return getPercentage(hired, offering)
}

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
      GraphQLClientService.fetchGraphQL(
        getCandidateConversionRateReport.query,
        {
          filter: filters,
        }
      ),
  })

  const candidateReport: CandidateJobStepByCandidateJobStatus[] =
    useMemo(() => {
      if (data && isRight(data)) {
        const response = unwrapEither(data)
        return response?.[getCandidateConversionRateReport.operation]?.data
      }
      return []
    }, [data])

  const applied = candidateReport.find(
    (item) => item.candidate_job_status === 'applied'
  )
  const interviewing = candidateReport.find(
    (item) => item.candidate_job_status === 'interviewing'
  )
  const offering = candidateReport.find(
    (item) => item.candidate_job_status === 'offering'
  )
  const hired = candidateReport.find(
    (item) => item.candidate_job_status === 'hired'
  )
  const interviewingPercentage = getInterviewingPercentage(
    applied?.amount ?? 0,
    interviewing?.amount ?? 0
  )
  const offeringPercentage = getOfferingPercentage(
    interviewing?.amount ?? 0,
    offering?.amount ?? 0
  )

  const hiredPercentage = getHiredPercentage(
    offering?.amount ?? 0,
    hired?.amount ?? 0
  )

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
