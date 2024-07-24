import dayjs from 'dayjs'
import { ValidateDate } from 'features/report/domain/interface'
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

export const handleValidateFromDateRangeDate = (
  filterType: ReportFilterPeriod,
  dateRange: ValueRangeDate
): ValidateDate => {
  switch (filterType) {
    case 'month':
      return validateFromDateByMonth(dateRange)
    case 'year':
      return validateFromDateByYear(dateRange)
    case 'quarter':
      return validateFromDateByQuarter(dateRange)
    case 'week':
      return validateFromDateByWeek(dateRange)
    default:
      throw new Error('Invalid period type')
  }
}

const validateFromDateByMonth = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date)
  return {
    maxDate: dayjs(),
    minDate: fromDate.subtract(11, 'month'),
  }
}

const validateFromDateByYear = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date)
  return {
    maxDate: dayjs(),
    minDate: fromDate.subtract(11, 'year'),
  }
}

const validateFromDateByQuarter = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date)
  return {
    maxDate: dayjs().endOf('quarter'),
    minDate: fromDate.subtract(11, 'quarter').startOf('quarter'),
  }
}

const validateFromDateByWeek = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date).endOf('week')
  return {
    maxDate: dayjs().endOf('week'),
    minDate: fromDate.subtract(11, 'week').startOf('week'),
  }
}
