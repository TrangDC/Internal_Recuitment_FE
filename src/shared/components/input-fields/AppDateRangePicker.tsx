import { Dayjs } from 'dayjs'
import FlexBox from '../flexbox/FlexBox'
import AppDateField from './AppDateField'
import { Box } from '@mui/material'

type AppDateRangePickerProps = {
  fromDate: Dayjs | null
  setFromDate: (date: Dayjs | null) => void
  toDate: Dayjs | null
  setToDate: (date: Dayjs | null) => void
}

function AppDateRangePicker(props: AppDateRangePickerProps) {
  const { setFromDate, setToDate } = props
  return (
    <FlexBox gap={1} width={'100%'}>
      <Box width={180}>
        <AppDateField
          label={'From date'}
          value={props.fromDate}
          format="dd/MM/yyyy"
          onChange={(date) => {
            setFromDate(date)
          }}
          textFieldProps={{
            fullWidth: true,
            size: 'small',
          }}
        />
      </Box>
      <Box width={180}>
        <AppDateField
          label={'To date'}
          value={props.toDate}
          format="dd/MM/yyyy"
          onChange={(date) => setToDate(date)}
          textFieldProps={{
            fullWidth: true,
            size: 'small',
          }}
        />
      </Box>
    </FlexBox>
  )
}
export default AppDateRangePicker
