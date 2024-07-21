import dayjs from 'dayjs'
import { ValueRangeDate } from 'shared/interfaces/date'
import { ReportFilterPeriod } from 'shared/schema/chart/report'
import { getQuarter } from 'shared/utils/date'

export const handleFormatLabelDate = (
  filterType: ReportFilterPeriod,
  dateRange: ValueRangeDate
): string => {
  switch (filterType) {
    case 'month':
      return formatLabelByMonth(dateRange)
    case 'year':
      return formatLabelByYear(dateRange)
    case 'quarter':
      return formatLabelByQuarter(dateRange)
    case 'week':
      return formatLabelByWeek(dateRange)
    case 'all':
      return ''
    default:
      throw new Error('Invalid period type')
  }
}

const formatLabelByMonth = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date)
  const toDate = dayjs(dateRange.to_date)
  const label = `${fromDate.format('MMM YYYY')} - ${toDate.format('MMM YYYY')}`
  return label
}

const formatLabelByYear = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date)
  const toDate = dayjs(dateRange.to_date)
  const label = `${fromDate.format('YYYY')} - ${toDate.format('YYYY')}`
  return label
}

const formatLabelByQuarter = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date).startOf('quarter')
  const toDate = dayjs(dateRange.to_date).endOf('quarter')
  const quarterFrom = getQuarter(fromDate.toString())
  const quarterTo = getQuarter(toDate.toString())
  const label = `Q${quarterFrom} ${fromDate.format('YYYY')} - Q${quarterTo} ${toDate.format('YYYY')}`
  return label
}

const formatLabelByWeek = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date).startOf('week')
  const toDate = dayjs(dateRange.to_date).endOf('week')
  const label = `${fromDate.format('DD MMM, YYYY')} - ${toDate.format('DD MMM, YYYY')}`
  return label
}
