import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import dayjs from 'dayjs'
import {
  setTimeToStartOfDay,
  setTimeToEndOfDay,
  getQuarter,
  formatLocalTime,
} from 'shared/utils/date'
import {
  RangeDateColumnBar,
  ReportFilter,
  ReportFilterPeriod,
} from 'shared/schema/chart/report'
import { ChartFilters } from 'features/report/domain/interface'
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)

export const handleFormatFilters = (filters: ChartFilters): ReportFilter => {
  if (!filters.value?.from_date && !filters.value?.to_date) {
    return {
      from_date: setTimeToStartOfDay(dayjs().startOf('month')).toISOString(),
      to_date: setTimeToEndOfDay(dayjs().endOf('month')).toISOString(),
      filter_period: filters.filterType,
    }
  }
  switch (filters.filterType) {
    case 'month':
      return formatByMonth(filters)
    case 'year':
      return formatByYear(filters)
    case 'quarter':
      return formatByQuarter(filters)
    case 'week':
      return formatByWeek(filters)
    case 'all':
      return formatByAll(filters)
    default:
      throw new Error('Invalid period type')
  }
}

const formatByMonth = (filters: ChartFilters): ReportFilter => {
  const fromDate =
    filters.value?.from_date &&
    setTimeToStartOfDay(filters.value?.from_date).startOf('month').add(1, 'day')
  const toDate =
    filters.value?.to_date &&
    setTimeToEndOfDay(filters.value?.to_date).endOf('month')
  return {
    from_date: fromDate?.toISOString() ?? '',
    to_date: toDate?.toISOString() ?? '',
    filter_period: filters.filterType,
  }
}

const formatByYear = (filters: ChartFilters): ReportFilter => {
  const fromDate =
    filters.value?.from_date &&
    setTimeToStartOfDay(filters.value?.from_date).startOf('year').add(1, 'day')
  const toDate =
    filters.value?.to_date &&
    setTimeToEndOfDay(filters.value?.to_date).endOf('year')
  return {
    from_date: fromDate?.toISOString() ?? '',
    to_date: toDate?.toISOString() ?? '',
    filter_period: filters.filterType,
  }
}

const formatByQuarter = (filters: ChartFilters): ReportFilter => {
  const fromDate =
    filters.value?.from_date &&
    setTimeToStartOfDay(filters.value?.from_date)
      .startOf('quarter')
      .add(1, 'day')
  const toDate =
    filters.value?.to_date &&
    setTimeToEndOfDay(filters.value?.to_date).endOf('quarter')
  return {
    from_date: fromDate?.toISOString() ?? '',
    to_date: toDate?.toISOString() ?? '',
    filter_period: filters.filterType,
  }
}

const formatByWeek = (filters: ChartFilters): ReportFilter => {
  const fromDate =
    filters.value?.from_date &&
    setTimeToStartOfDay(filters.value?.from_date).startOf('week').add(1, 'day')
  const toDate =
    filters.value?.to_date &&
    setTimeToEndOfDay(filters.value?.to_date).endOf('week')
  return {
    from_date: fromDate?.toISOString() ?? '',
    to_date: toDate?.toISOString() ?? '',
    filter_period: filters.filterType,
  }
}

const formatByAll = (filters: ChartFilters): ReportFilter => {
  return {
    from_date: '0001-01-01T00:00:00Z',
    to_date: '0001-01-01T00:00:00Z',
    filter_period: filters.filterType,
  }
}

export const handleFormatLabel = (
  filterType: ReportFilterPeriod,
  statsPerTimePeriod: RangeDateColumnBar[]
): string[] => {
  switch (filterType) {
    case 'month':
      return formatLabelByMonth(statsPerTimePeriod)
    case 'year':
      return formatLabelByYear(statsPerTimePeriod)
    case 'quarter':
      return formatLabelByQuarter(statsPerTimePeriod)
    case 'week':
      return formatLabelByWeek(statsPerTimePeriod)
    default:
      throw new Error('Invalid period type')
  }
}

const formatLabelByMonth = (
  statsPerTimePeriod: RangeDateColumnBar[]
): string[] => {
  return statsPerTimePeriod.map((i) => {
    const fromDate = dayjs(i.from_date).add(1, 'day')
    const label = `${fromDate.format('MMM')} ${fromDate.format('YYYY')}`
    return label
  })
}

const formatLabelByYear = (
  statsPerTimePeriod: RangeDateColumnBar[]
): string[] => {
  return statsPerTimePeriod.map((i) => {
    const fromDate = dayjs(i.from_date)
    const label = fromDate.format('YYYY')
    return label
  })
}

const formatLabelByQuarter = (
  statsPerTimePeriod: RangeDateColumnBar[]
): string[] => {
  return statsPerTimePeriod.map((i) => {
    const quarter = getQuarter(dayjs(i.from_date).add(1, 'day').toISOString())
    const fromDate = dayjs(i.from_date)
    const label = `Q${quarter} ${fromDate.format('YYYY')}`
    return label
  })
}

const formatLabelByWeek = (
  statsPerTimePeriod: RangeDateColumnBar[]
): string[] => {
  return statsPerTimePeriod.map((i) => {
    const fromDate = dayjs(i.from_date)
    const toDate = dayjs.utc(i.to_date)
    const label = `${fromDate.format('MMM')} ${fromDate.format('DD')}-${toDate.format('DD')}`
    return label
  })
}

export function handleChangeFilterType(filters: ChartFilters): ChartFilters {
  const to_date = filters.value?.to_date ?? dayjs()
  switch (filters.filterType) {
    case 'month':
      return {
        filterType: 'month',
        value: {
          from_date: to_date?.subtract(11, 'month'),
          to_date: to_date,
        },
      }
    case 'year':
      return {
        filterType: 'year',
        value: {
          from_date: to_date?.subtract(11, 'year'),
          to_date: to_date,
        },
      }
    case 'quarter':
      return {
        filterType: 'quarter',
        value: {
          from_date: to_date?.subtract(11, 'quarter'),
          to_date: to_date,
        },
      }
    case 'week':
      return {
        filterType: 'week',
        value: {
          from_date: to_date?.subtract(11, 'week'),
          to_date: to_date,
        },
      }
    default:
      throw new Error('Invalid period type')
  }
}
