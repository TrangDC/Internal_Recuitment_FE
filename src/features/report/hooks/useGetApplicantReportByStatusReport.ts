import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
  ApplicationReportTable,
  ReportFilter,
} from 'shared/schema/chart/report'
import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/graphql-service'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { getPercentage } from 'shared/utils/convert-string'
import { FailedReasonDataTable } from '../presentation/components/TableFailedReason'

type UseGetApplicantReportByStatusReportProps = {
  filters: ReportFilter
}

const sortBy = ['invite_to_interview', 'interviewing', 'done', 'cancelled']

function useGetApplicantReportByStatusReport({
  filters,
}: UseGetApplicantReportByStatusReportProps) {
  const { getApplicantReportByStatus, queryKey } = useGraphql()
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getApplicantReportByStatus.query, {
        filter: filters,
      }),
  })

  const applicantReportByStatus: ApplicationReportTable = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getApplicantReportByStatus.operation]?.data
    }
    return []
  }, [data])

  const processingData = applicantReportByStatus?.processing ?? {}
  const kivData = applicantReportByStatus.kiv ?? {}
  const offerLostData = applicantReportByStatus.offered_lost ?? {}

  const processingDataSorted = sortBy.map((keyword) => {
    const number = _.get(processingData, keyword, 0)
    return number
  })

  const totalKiv = Object.keys(kivData).reduce((t: number, a) => {
    const amount = _.get(kivData, a, 0)
    return t + amount
  }, 0)

  const totalOfferLost = Object.keys(offerLostData).reduce((t: number, a) => {
    const amount = _.get(offerLostData, a, 0)
    return t + amount
  }, 0)

  const kivDataFormat: FailedReasonDataTable[] = Object.keys(kivData).map(
    (keyword) => {
      const amount = _.get(kivData, keyword, 0)
      const name = t(keyword)
      const percentage = `${getPercentage(amount, totalKiv)}%`
      const kiv: FailedReasonDataTable = {
        numberOfFailedReason: amount,
        name,
        percentage,
      }
      return kiv
    }
  )

  const offerLostDataFormat: FailedReasonDataTable[] = Object.keys(
    offerLostData
  ).map((keyword) => {
    const amount = _.get(offerLostData, keyword, 0)
    const name = t(keyword)
    const percentage = `${getPercentage(amount, totalOfferLost)}%`
    const kiv: FailedReasonDataTable = {
      numberOfFailedReason: amount,
      name,
      percentage,
    }
    return kiv
  })
  const kivDataFormatSorted = _.orderBy(
    kivDataFormat,
    'numberOfFailedReason',
    'desc'
  )
  const offerLostDataSorted = _.orderBy(
    offerLostDataFormat,
    'numberOfFailedReason',
    'desc'
  )

  return {
    processingData: processingDataSorted,
    kivData: kivDataFormatSorted,
    offerLostData: offerLostDataSorted,
    isLoading,
  }
}

export default useGetApplicantReportByStatusReport
