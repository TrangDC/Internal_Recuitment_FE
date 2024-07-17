import dayjs from 'dayjs'
import { ValueRangeDate } from 'shared/interfaces/date'
import { PeriodFilter } from 'shared/schema/chart/report'
import { getQuarter } from 'shared/utils/date'

export const handleFormatLabelDate = (
  filterType: PeriodFilter,
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
  const label = `${fromDate.format('MMM')} ${fromDate.format('YYYY')} - ${toDate.format('MMM')} ${toDate.format('YYYY')}`
  return label
}

const formatLabelByYear = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date)
  const toDate = dayjs(dateRange.to_date)
  const label = `${fromDate.format('YYYY')} - ${toDate.format('YYYY')}`
  return label
}

const formatLabelByQuarter = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date)
  const toDate = dayjs(dateRange.to_date)

  const quarterFrom = getQuarter(dateRange.from_date?.toString() ?? '')
  const quarterTo = getQuarter(dateRange.to_date?.toString() ?? '')
  const label = `Q${quarterFrom} ${fromDate.format('YYYY')} - Q${quarterTo} ${toDate.format('YYYY')}`
  return label
}

const formatLabelByWeek = (dateRange: ValueRangeDate): string => {
  const fromDate = dayjs(dateRange.from_date)
  const toDate = dayjs(dateRange.to_date)
  const label = `${fromDate.format('DD')} ${fromDate.format('MMM')} - ${toDate.format('DD')} ${toDate.format('MMM')}`
  return label
}