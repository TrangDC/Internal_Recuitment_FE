import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { SxProps, Theme, styled } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
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
  ...(isHovered &&
    !isSelected && {
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
  onChange: (value: Dayjs | null) => void
  value: Dayjs | null
  sx?: SxProps<Theme>
  maxDate?: Dayjs
  minDate?: Dayjs
  disableFuture?: boolean
}

export default function WeekPicker(props: IWeekPicker) {
  const { onChange, value, ...other } = props
  const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(
    value ?? dayjs()
  )
  function handleOnChange(date: Dayjs) {
    onChange(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        sx={{
          '& .MuiPickersCalendarHeader-label': {
            fontSize: 12,
            fontWeight: 700,
            lineHeight: '16px',
          },
          border: '1px solid #E3E6EB',
          borderRadius: '4px',
        }}
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
        {...other}
      />
    </LocalizationProvider>
  )
}
