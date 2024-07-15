import { ValueRangeDate } from 'shared/interfaces/date'
import { PeriodFilter } from 'shared/schema/chart/report'

export interface ChartFilters {
  value: ValueRangeDate | null
  filterType: PeriodFilter
}


export type ByHiringTeam = {
   team:string
   indicator:string
   applied:string
   interviewing:string
   offering:string
   hired:string
}