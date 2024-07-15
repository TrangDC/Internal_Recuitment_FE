import { Button, styled } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import Vector from 'shared/components/icons/Vector'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import QuarterDateRange from 'shared/components/date/date-range/QuarterDateRange/QuarterDateRange'
import MonthDateRange from 'shared/components/date/date-range/MonthDateRange/MonthDateRange'
import WeekDateRange from 'shared/components/date/date-range/WeekDateRange/WeekDateRange'
import YearDateRange from 'shared/components/date/date-range/YearDateRange/YearDateRange'
import { ValueRangeDate } from 'shared/interfaces/date'
import { handleFormatLabelDate } from './utils'
import { ReportFilterPeriod } from 'shared/schema/chart/report'

dayjs.extend(isBetweenPlugin)
dayjs.extend(utc)

const RangeDateByQuarterLabel = styled(Button)(() => ({
  height: '26px',
  width: '190px',
  fontSize: 12,
  fontWeight: 500,
  padding: '4px 8px 4px 4px',
  border: '1px solid #E3E6EB',
  backgroundColor: '#FCFCFC !important',
}))

type RangeDateByCategoryProps = {
  filterType: ReportFilterPeriod
  onChange: (value: ValueRangeDate | null) => void
  value: ValueRangeDate | null
}

function RangeDateByCategory(props: RangeDateByCategoryProps) {
  const { filterType, onChange, value } = props
  const [anchorQuarter, setAnchorQuarter] = useState<HTMLButtonElement | null>(
    null
  )
  const [anchorMonth, setAnchorMonth] = useState<HTMLButtonElement | null>(null)
  const [anchorWeek, setAnchorWeek] = useState<HTMLButtonElement | null>(null)
  const [anchorYear, setAnchorYear] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (filterType) {
      case 'month':
        setAnchorMonth(event.currentTarget)
        break
      case 'quarter':
        setAnchorQuarter(event.currentTarget)
        break
      case 'week':
        setAnchorWeek(event.currentTarget)
        break
      case 'year':
        setAnchorYear(event.currentTarget)
        break
      default:
        break
    }
  }

  const handleClose = () => {
    switch (filterType) {
      case 'month':
        setAnchorMonth(null)
        break
      case 'quarter':
        setAnchorQuarter(null)
        break
      case 'week':
        setAnchorWeek(null)
        break
      case 'year':
        setAnchorYear(null)
        break
      default:
        break
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RangeDateByQuarterLabel
        variant="text"
        endIcon={<Vector style={{ width: '11px', height: '11px' }} />}
        onClick={handleClick}
      >
        {value && handleFormatLabelDate(filterType, value)}
      </RangeDateByQuarterLabel>
      {filterType === 'quarter' && (
        <QuarterDateRange
          handleClose={handleClose}
          anchor={anchorQuarter}
          value={value}
          onChange={onChange}
        />
      )}
      {filterType === 'month' && (
        <MonthDateRange
          handleClose={handleClose}
          anchor={anchorMonth}
          value={value}
          onChange={onChange}
        />
      )}
      {filterType === 'week' && (
        <WeekDateRange
          handleClose={handleClose}
          anchor={anchorWeek}
          value={value}
          onChange={onChange}
        />
      )}
      {filterType === 'year' && (
        <YearDateRange
          handleClose={handleClose}
          anchor={anchorYear}
          value={value}
          onChange={onChange}
        />
      )}
    </LocalizationProvider>
  )
}

export default RangeDateByCategory
