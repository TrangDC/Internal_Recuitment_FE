import { useEffect, useState } from 'react'
import AppDateField from '../input-fields/DateField'
import FlexBox from '../flexbox/FlexBox'
import ButtonFilter from './ButtonFilter'
import ChipField from '../input-fields/ChipField'
import dayjs from 'dayjs'

interface Props {
  onChange: ({
    fromDate,
    toDate,
  }: {
    fromDate: Date | null
    toDate: Date | null
  }) => void
}

const DateRangeFilter = ({ onChange }: Props) => {
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)

  useEffect(() => {
    onChange({ fromDate, toDate })
  }, [fromDate, toDate])

  return (
    <FlexBox flexDirection={'column'}>
      <ButtonFilter
        inputLabel={'Recruit time'}
        typographyProps={{
          sx: {
            p: 1,
            pr: 2,
            pl: 2,
            width: '100%',
            maxWidth: '500px',
          },
        }}
        node={
          <FlexBox gap={'8px'}>
            <AppDateField
              sx={{
                width: '180px',
              }}
              label={'From date'}
              value={fromDate}
              format="dd/MM/yyyy"
              onChange={(date) => {
                setFromDate(date as Date)
              }}
              textFieldProps={{
                fullWidth: true,
                size: 'small',
              }}
            />

            <AppDateField
              sx={{
                width: '180px',
              }}
              label={'To date'}
              value={toDate}
              format="dd/MM/yyyy"
              onChange={(date) => {
                setToDate(date as Date)
              }}
              textFieldProps={{
                fullWidth: true,
                size: 'small',
              }}
            />
          </FlexBox>
        }
      />
      <FlexBox gap={'10px'}>
        {fromDate && (
          <ChipField
            label={`From Date ${dayjs(fromDate).format('DD/MM/YYYY')}`}
            onDelete={() => {
              setFromDate(null)
              // onChange?.(filterOption)
            }}
          />
        )}
        {toDate && (
          <ChipField
            label={`To Date ${dayjs(toDate).format('DD/MM/YYYY')}`}
            onDelete={() => {
              setToDate(null)
              // onChange?.(filterOption)
            }}
          />
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default DateRangeFilter
