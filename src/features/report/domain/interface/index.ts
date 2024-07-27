import { Dayjs } from 'dayjs'
import { ValueRangeDate } from 'shared/interfaces/date'
import { ReportFilterPeriod } from 'shared/schema/chart/report'

export interface ChartFilters {
  value: ValueRangeDate | null
  filterType: ReportFilterPeriod
}

export type HiringTeamTableValue = {
  value: number
  percentage: string
}

export type HiringTeamTableData = {
  teamName: string
  indicator: string
  applied: HiringTeamTableValue
  interviewing: HiringTeamTableValue
  offering: HiringTeamTableValue
  hired: HiringTeamTableValue
}

export type ValidateDate = {
  minDateFrom: Dayjs
  maxDateFrom: Dayjs
  maxDateTo:Dayjs
}

