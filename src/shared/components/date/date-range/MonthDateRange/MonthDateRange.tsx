import FlexBox from 'shared/components/flexbox/FlexBox'
import { Text15sb } from 'shared/components/Typography'
import { Box, Popover } from '@mui/material'
import { Dayjs } from 'dayjs'
import MonthPicker from '../../MonthPicker/MonthPicker'
import { ValueRangeDate } from 'shared/interfaces/date'

interface MonthDateRangeProps {
  handleClose: () => void
  anchor: HTMLButtonElement | null
  onFromChange: (value: Dayjs | null) => void
  onToChange: (value: Dayjs | null) => void
  value: ValueRangeDate | null
  fromDateProps?: {
    maxDate?: Dayjs
    minDate?: Dayjs
    disableFuture?: boolean
  }
  toDateProps?: {
    maxDate?: Dayjs
    minDate?: Dayjs
    disableFuture?: boolean
  }
}

function MonthDateRange(props: MonthDateRangeProps) {
  const {
    handleClose,
    anchor,
    value = null,
    onFromChange,
    onToChange,
    fromDateProps,
    toDateProps,
  } = props
  const open = Boolean(anchor)
  const id = open ? 'simple-popover' : undefined
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
          <MonthPicker
            onChange={(dateValue) => onFromChange(dateValue)}
            value={value?.from_date ?? null}
            {...fromDateProps}
          />
        </Box>
        <Box>
          <Text15sb fontWeight={700} marginBottom={1}>
            To
          </Text15sb>
          <MonthPicker
            onChange={(dateValue) => onToChange(dateValue)}
            value={value?.to_date ?? null}
            {...toDateProps}
          />
        </Box>
      </FlexBox>
    </Popover>
  )
}

export default MonthDateRange
