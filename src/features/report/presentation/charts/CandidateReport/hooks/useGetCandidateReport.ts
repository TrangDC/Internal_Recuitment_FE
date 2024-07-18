import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from '../graphql/graphql'
import dayjs from 'dayjs'
import _ from 'lodash'
import { getPercentage } from 'shared/utils/convert-string'
import { CandidateReport } from 'shared/schema/chart/report'
import GraphQLClientService from 'services/graphql-service'

const CandidateLabels = {
  eb: 'EB',
  hiring_platform: 'Hiring Platform',
  rec: 'REC',
  headhunt: 'Headhunt',
  reference: 'Reference',
}

function useGetCandidateReport() {
  const { getCandidateReport, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateReport.query, {
        filter: {
          filter_period: 'all',
          from_date: '0001-01-01T00:00:00Z',
          to_date: '0001-01-01T00:00:00Z',
        },
      }),
  })

  const candidateReport: CandidateReport = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateReport.operation]?.data
    }
    return {}
  }, [data])

  const blacklist = candidateReport.blacklist_number
  const active = candidateReport.total - blacklist
  const number_by_ref_type = candidateReport?.number_by_ref_type ?? []

  const series = Object.keys(CandidateLabels).map((key) => {
    const type = key
    const item = number_by_ref_type.find((item) => item.type === type)
    return item ? item.number : 0
  })

  const labels = Object.keys(CandidateLabels).map((key: string) => {
    return _.get(CandidateLabels, key)
  })

  const candidateTotal = [active, blacklist].reduce(
    (acc: number, value: number) => acc + value,
    0
  )

  const informationActive = {
    number: active,
    percentage: getPercentage(active, candidateTotal),
  }

  const informationBlackList = {
    number: blacklist,
    percentage: getPercentage(blacklist, candidateTotal),
  }
  return {
    series,
    isLoading,
    labels,
    informationBlackList,
    informationActive,
  }
}

export default useGetCandidateReport
