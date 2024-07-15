import FlexBox from 'shared/components/flexbox/FlexBox'
import { Tiny12 } from 'shared/components/Typography'
import { Box, Popover } from '@mui/material'
import { Dayjs } from 'dayjs'
import YearPicker from '../../YearPicker/YearPicker'
import { ValueRangeDate } from 'shared/interfaces/date'
import { useState } from 'react'

interface YearDateRangeProps {
  handleClose: () => void
  anchor: HTMLButtonElement | null
  onChange: (value: ValueRangeDate | null) => void
  value: ValueRangeDate | null
}

function YearDateRange(props: YearDateRangeProps) {
  const { handleClose, anchor, value = null, onChange } = props
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
    >
      <FlexBox padding={'10px'} gap={'20px'}>
        <Box>
          <Tiny12 fontWeight={700} marginBottom={1}>
            From
          </Tiny12>
          <YearPicker
            onChange={(value) => handleChange('from', value)}
            value={valueDate?.from_date}
          />
        </Box>
        <Box>
          <Tiny12 fontWeight={700} marginBottom={1}>
            To
          </Tiny12>
          <YearPicker
            onChange={(value) => handleChange('to', value)}
            value={valueDate?.to_date}
          />
        </Box>
      </FlexBox>
    </Popover>
  )
}

export default YearDateRange
