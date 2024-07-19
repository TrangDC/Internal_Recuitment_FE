import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect } from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

const quarterSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
]

const DateCalendarStyled = styled(DateCalendar)(() => ({
  border: '1px solid #E3E6EB',
  '& .MuiPickersCalendarHeader-label': {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '16px',
  },
  borderRadius: '4px',
  '& .MuiPickersMonth-monthButton': {
    '&.highlighted-quarter': {
      backgroundColor: '#2499EF !important',
      color: 'white',
      width: '100% !important',
      borderRadius: 0,
    },
    '&.end-quarter': {
      borderRadius: 0,
      borderBottomRightRadius: '16px',
      borderTopRightRadius: '16px',
    },
    '&.start-quarter': {
      borderRadius: 0,
      borderBottomLeftRadius: '16px',
      borderTopLeftRadius: '16px',
    },
  },
}))

const startQuarter = [0, 3, 6, 9]
const endQuarter = [2, 5, 8, 11]

interface QuarterPickerProps {
  className: string
  onChange: (value: Dayjs | null) => void
  value: Dayjs | null
}

const QuarterPicker = (props: QuarterPickerProps) => {
  const { className, onChange, value } = props
  const quarterClassName = `.${className} .MuiPickersMonth-root`
  const clearMonthsHighlight = () => {
    const months = document.querySelectorAll(quarterClassName)
    Array.from(months).forEach((month) => {
      if (month.firstChild && month.firstChild instanceof HTMLElement) {
        const buttonElement = month.firstChild as HTMLElement
        buttonElement.classList.remove(
          'highlighted-quarter',
          'start-quarter',
          'end-quarter'
        )
      }
    })
  }

  const highlightQuarter = (selectedMonthNumber: any) => {
    setTimeout(() => {
      const months = document.querySelectorAll(quarterClassName)
      const quarterSet =
        quarterSets.find((set) => set.includes(selectedMonthNumber)) ?? []
      quarterSet.forEach((monthNumber) => {
        const buttonElement = months[monthNumber]?.firstChild as HTMLElement
        if (buttonElement) {
          if (startQuarter.includes(monthNumber)) {
            buttonElement.classList.add('start-quarter')
          }
          if (endQuarter.includes(monthNumber)) {
            buttonElement.classList.add('end-quarter')
          }
          buttonElement.classList.add('highlighted-quarter')
        }
      })
    }, 0) // Delay to ensure the DOM is fully rendered
  }

  useEffect(() => {
    clearMonthsHighlight()
    highlightQuarter(value?.month())
  }, [value])

  function handleOnChange(value: Dayjs) {
    onChange(value)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendarStyled
        className={className}
        views={['year', 'month']}
        value={value}
        onChange={(value) => handleOnChange(value)}
      />
    </LocalizationProvider>
  )
}

export default QuarterPicker
