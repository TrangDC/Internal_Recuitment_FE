import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
  CandidateJobReportByStatus,
  ReportFilter,
} from 'shared/schema/chart/report'
import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/graphql-service'

type UseGetApplicantReportByStatusReportProps = {
  filters: ReportFilter
}

const sortBy = ['invited_to_interview', 'interviewing', 'done', 'cancelled']

function useGetApplicantReportByStatusReport({
  filters,
}: UseGetApplicantReportByStatusReportProps) {
  const { getApplicantReportByStatus, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getApplicantReportByStatus.query, {
        filter: filters,
      }),
  })

  const applicantReportByStatus: CandidateJobReportByStatus = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getApplicantReportByStatus.operation]?.data
    }
    return []
  }, [data])

  const processingData =
    applicantReportByStatus?.processing_candidate_job_data ?? []
  const kivData = applicantReportByStatus.kiv_candidate_job_data ?? []
  const offerLostData =
    applicantReportByStatus.offer_lost_candidate_job_data ?? []

  const processingDataSorted = sortBy.map((keyword) => {
    return processingData.find((item) => item.status === keyword)?.amount ?? 0
  })

  return {
    processingData: processingDataSorted,
    kivData,
    offerLostData,
    isLoading,
  }
}

export default useGetApplicantReportByStatusReport
