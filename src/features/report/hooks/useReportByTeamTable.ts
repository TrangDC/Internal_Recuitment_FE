import { CandidateConversionRateReport2 } from 'shared/schema/chart/report'
import { getPercentage } from 'shared/utils/convert-string'
import useGraphql from '../domain/graphql/CandidateJobStepReportByTeam.graphql'
import { HiringTeamTableData } from '../domain/interface'
import { useCustomTable } from 'shared/components/table'

function useReportByTeamTable() {
  const { reportCandidateConversionRateByHiringTeam, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: reportCandidateConversionRateByHiringTeam,
    queryKey,
    orderBy: {
      direction: 'ASC',
      field: 'hiring_team_name',
    },
    perPage: 100,
  })

  const sortData: CandidateConversionRateReport2[] = useTableReturn.sortData

  const hiringTeam: HiringTeamTableData[] = sortData.map((item) => {
    const applied = item.applied ?? 0
    const hired = item.hired ?? 0
    const interviewing = item.interviewing ?? 0
    const offering = item.offering ?? 0

    const hiredPercentage = getPercentage(hired, offering)
    const interviewingPercentage = getPercentage(interviewing, applied)
    const offeringPercentage = getPercentage(offering, interviewing)

    const data: HiringTeamTableData = {
      teamName: item.hiring_team_name,
      indicator: '',
      applied: {
        value: applied,
        percentage: `100%`,
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
