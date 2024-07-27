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
    case 'year':
      return validateFromDateByYear(dateRange)
    case 'month':
      return validateFromDateByMonth(dateRange)
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
    maxDateFrom:fromDate,
    minDateFrom: fromDate.subtract(11, 'month'),
    maxDateTo:dayjs(),
  }
}

const validateFromDateByYear = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date)
  return {
    maxDateFrom: fromDate,
    minDateFrom: fromDate.subtract(11, 'year'),
    maxDateTo:dayjs(),
  }
}

const validateFromDateByQuarter = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date)
  return {
    maxDateFrom: fromDate.endOf('quarter'),
    minDateFrom: fromDate.subtract(11, 'quarter').startOf('quarter'),
    maxDateTo:dayjs().endOf('quarter'),
  }
}

const validateFromDateByWeek = (dateRange: ValueRangeDate): ValidateDate => {
  const fromDate = dayjs(dateRange.to_date).endOf('week')
  return {
    maxDateFrom:fromDate.endOf('week'),
    minDateFrom: fromDate.subtract(11, 'week').startOf('week'),
    maxDateTo:dayjs().endOf('week'),
  }
}



export const handleCheckDateChange = (filterType: ReportFilterPeriod,
  dateRange: ValueRangeDate) => {
  switch (filterType) {
    case 'year':
      return changeDateByYear(dateRange)
    case 'month':
      return changeDateByMonth(dateRange)
    case 'quarter':
      return changeDateByQuarter(dateRange)
    case 'week':
      return changeDateByWeek(dateRange)
    default:
      throw new Error('Invalid period type')
  }
}


const changeDateByYear = (dateRange: ValueRangeDate):ValueRangeDate => {
  const fromDate = dateRange?.from_date
  const toDate = dateRange?.to_date
  const yearsDifference = toDate?.diff(fromDate, 'year');
  if(toDate && yearsDifference && yearsDifference >= 11){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(11, 'year')
    }
  }
  if(toDate && yearsDifference && yearsDifference < 0){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(1, 'year')
    }
  }
  return {
    to_date:toDate,
    from_date:fromDate
  }
}



const changeDateByQuarter = (dateRange: ValueRangeDate):ValueRangeDate => {
  const fromDate = dateRange?.from_date?.startOf('quarter') ?? null
  const toDate = dateRange?.to_date?.startOf('quarter') ?? null
  const yearsDifference = toDate?.diff(fromDate, 'quarter');
  if(toDate && yearsDifference && yearsDifference >= 11){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(11, 'quarter')
    }
  }
  if(toDate && yearsDifference && yearsDifference < 0){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(1, 'quarter')
    }
  }
  return {
    to_date:toDate,
    from_date:fromDate
  }
}


const changeDateByWeek = (dateRange: ValueRangeDate):ValueRangeDate => {
  const fromDate = dateRange?.from_date?.startOf('week') ?? null
  const toDate = dateRange?.to_date?.startOf('week') ?? null
  const yearsDifference = toDate?.diff(fromDate, 'week');
  if(toDate && yearsDifference && yearsDifference >= 11){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(11, 'week')
    }
  }
  if(toDate && yearsDifference && yearsDifference < 0){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(1, 'week')
    }
  }
  return {
    to_date:toDate,
    from_date:fromDate
  }
}


const changeDateByMonth = (dateRange: ValueRangeDate):ValueRangeDate => {
  const fromDate = dateRange?.from_date
  const toDate = dateRange?.to_date
  const yearsDifference = toDate?.diff(fromDate, 'month');
  if(toDate && yearsDifference && yearsDifference >= 11){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(11, 'month')
    }
  }
  if(toDate && yearsDifference && yearsDifference < 0){
    return {
      to_date:toDate,
      from_date:toDate?.subtract(1, 'month')
    }
  }
  return {
    to_date:toDate,
    from_date:fromDate
  }
}