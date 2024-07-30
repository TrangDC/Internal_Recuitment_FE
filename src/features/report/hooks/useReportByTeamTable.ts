import { CandidateConversionRateReport2 } from 'shared/schema/chart/report'
import { getPercentage } from 'shared/utils/convert-string'
import useGraphql from '../domain/graphql/CandidateJobStepReportByTeam.graphql'
import { HiringTeamTableData } from '../domain/interface'
import { useCustomTable } from 'shared/components/table'

function useReportByTeamTable() {
  const { reportCandidateConversionRateTable, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: reportCandidateConversionRateTable,
    queryKey,
    orderBy: {
      direction: 'ASC',
      field: 'hiring_team_name',
    },
  })

  const sortData: CandidateConversionRateReport2[] = useTableReturn.sortData

  const hiringTeam: HiringTeamTableData[] = sortData.map((item) => {
    const applied = item.applied ?? 0
    const hired = item.hired ?? 0
    const interviewing = item.interviewing ?? 0
    const offering = item.offering ?? 0
    const total = applied + hired + interviewing + offering

    const appliedPercentage = getPercentage(applied, total)
    const hiredPercentage = getPercentage(hired, total)
    const interviewingPercentage = getPercentage(interviewing, total)
    const offeringPercentage = getPercentage(offering, total)

    const data: HiringTeamTableData = {
      teamName: item.hiring_team_name,
      indicator: '',
      applied: {
        value: applied,
        percentage: `${appliedPercentage}%`,
      },
      interviewing: {
        value: interviewing,
        percentage: `${interviewingPercentage}%`,
      },
      offering: { value: offering, percentage: `${offeringPercentage}%` },
      hired: { value: hired, percentage: `${hiredPercentage}%` },
    }

    return data
  })

  return {
    useTableReturn: {
      ...useTableReturn,
      sortData: hiringTeam,
    },
  }
}

export default useReportByTeamTable
