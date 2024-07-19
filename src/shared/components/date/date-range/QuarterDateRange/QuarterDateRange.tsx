import FlexBox from 'shared/components/flexbox/FlexBox'
import QuarterPicker from '../../QuarterPicker/QuarterPicker'
import { Text15sb } from 'shared/components/Typography'
import { Box, Popover } from '@mui/material'
import { Dayjs } from 'dayjs'
import { ValueRangeDate } from 'shared/interfaces/date'
import { useState } from 'react'

interface QuarterDateRangeProps {
  handleClose: () => void
  anchor: HTMLButtonElement | null
  onChange: (value: ValueRangeDate) => void
  value: ValueRangeDate | null
}

function QuarterDateRange(props: QuarterDateRangeProps) {
  const { handleClose, anchor, value, onChange } = props
  const defaultDateRange: ValueRangeDate = { from_date: null, to_date: null }
  const [valueDate, setValueDate] = useState<ValueRangeDate>(
    value ?? defaultDateRange
  )
  const open = Boolean(anchor)
  const id = open ? 'simple-popover' : undefined
  function handleChange(type: 'from' | 'to', value: Dayjs | null) {
    setValueDate((prev) => {
      const newDate =
        type === 'from'
          ? {
              ...prev,
              from_date: value,
            }
          : {
              ...prev,
              to_date: value,
            }
      onChange(newDate)
      return newDate
    })
  }
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiPaper-root': {
          boxShadow: '0px 0px 20px 0px #28293D33',
        },
      }}
    >
      <FlexBox padding={'10px'} gap={'20px'}>
        <Box>
          <Text15sb fontWeight={700} marginBottom={1}>
            From
          </Text15sb>
          <QuarterPicker
            className="from-quarter-picker"
            onChange={(dateValue) => handleChange('from', dateValue)}
            value={valueDate?.from_date}
          />
        </Box>
        <Box>
          <Text15sb fontWeight={700} marginBottom={1}>
            To
          </Text15sb>
          <QuarterPicker
            className="to-quarter-picker"
            onChange={(dateValue) => handleChange('to', dateValue)}
            value={valueDate?.to_date}
          />
        </Box>
      </FlexBox>
    </Popover>
  )
}

export default QuarterDateRange
