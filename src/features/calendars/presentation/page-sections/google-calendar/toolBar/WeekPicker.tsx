import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { styled } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { Popover } from '@mui/material'
import DatePickerCalendar, { ChosenDateType } from './DatePickerCalendar'
import { formatDate } from '../config'
import utc from 'dayjs/plugin/utc'

dayjs.extend(isBetweenPlugin)
dayjs.extend(utc)

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean
  isHovered: boolean
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false
  }

  return dayA.isSame(dayB, 'week')
}

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null
    hoveredDay?: Dayjs | null
  }
) {
  const { day, selectedDay, hoveredDay, ...other } = props

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  )
}

interface IWeekPicker {
  onChange: (value: ChosenDateType) => void
  value: ChosenDateType
}

export default function WeekPicker(props: IWeekPicker) {
  const { onChange, value } = props
  const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(value)
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleOnChange(date: ChosenDateType) {
    onChange(date)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div onClick={handleClick}>
          <DatePickerCalendar
            open={false}
            views={['month', 'year']}
            format={formatDate}
            value={value}
          />
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <DateCalendar
            value={value}
            onChange={handleOnChange}
            showDaysOutsideCurrentMonth
            slots={{ day: Day }}
            slotProps={{
              day: (ownerState) =>
                ({
                  selectedDay: value,
                  hoveredDay,
                  onPointerEnter: () => setHoveredDay(ownerState.day),
                  onPointerLeave: () => setHoveredDay(null),
                }) as any,
            }}
          />
        </Popover>
      </LocalizationProvider>
    </React.Fragment>
  )
}
