import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import {
  CandidateJobStepByTeam,
  ReportFilter,
} from 'shared/schema/chart/report'
import { getPercentage } from 'shared/utils/convert-string'
import _ from 'lodash'
import { ConversionDataType } from '../presentation/components/ConversionTable'
import useGraphql from '../domain/graphql/CandidateJobStepReportByTeam.graphql'
import GraphQLClientService from 'services/graphql-service'

type UseGetCandidateJobStepReportByTeamProps = {
  filters: ReportFilter
}

const status = ['hired', 'interviewing', 'offering', 'applied']

function useGetCandidateJobStepReportByTeam({
  filters,
}: UseGetCandidateJobStepReportByTeamProps) {
  const { getCandidateJobStepReportByTeam, queryKey } = useGraphql()
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(getCandidateJobStepReportByTeam.query, {
        filter: filters,
      }),
  })

  const candidateJobStepByTeam: CandidateJobStepByTeam[] = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[getCandidateJobStepReportByTeam.operation]?.data
    }
    return []
  }, [data])

  const hiringTeam: ConversionDataType[] = candidateJobStepByTeam.map(
    (item) => {
      const data: ConversionDataType = {
        team: item.team.name,
        indicator: '',
        applied: {
          value: 0,
          percentage: '0%',
        },
        interviewing: { value: 0, percentage: '0%' },
        offering: { value: 0, percentage: '0%' },
        hired: { value: 0, percentage: '0%' },
      }
      const total = item.candidate_job_step_by_status.reduce(
        (a, b) => a + b.amount,
        0
      )
      item.candidate_job_step_by_status.forEach((i) => {
        if (status.includes(i.candidate_job_status)) {
          _.set(data, i.candidate_job_status, {
            value: i.amount,
            percentage: `${getPercentage(i.amount, total)}%`,
          })
        }
      })
      return data
    }
  )

  return {
    hiringTeam: hiringTeam,
    isLoading,
  }
}

export default useGetCandidateJobStepReportByTeam
