import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { convertDateToISOString } from 'shared/utils/utils'
import AuditLogComponent from 'features/auditTrails/presentation/page-sections/AuditLogComponent'
import {
  FormWrapper,
  HistoryWrapper,
  LogsWrapper,
} from '../../providers/styles'
import { IconButton, InputAdornment } from '@mui/material'
import SearchIcon from 'shared/components/icons/SearchIcon'
import AppTextField from 'shared/components/input-fields/AppTextField'
import dayjs from 'dayjs'
import { BaseRecord } from 'shared/interfaces'

interface Props {
  module: string
}

const HistoryLogAuditTrails = ({ module }: Props) => {
  const [searchField, setSearchField] = useState('')
  const [fromDate, setFromDate] = useState<Date | null>()
  const [toDate, setToDate] = useState<Date | null>()

  const refLog = useRef<{
    handleMultipleFilter: (record: BaseRecord) => void
    handleFreeWord: (name: string, value: string) => void
  }>()

  const handleChangeDate = (record: BaseRecord) => {
    const handleFilter = refLog?.current?.['handleMultipleFilter']
    handleFilter?.(record)
  }

  const handleSearch = (name: string, value: string) => {
    const handleFreeWord = refLog?.current?.['handleFreeWord']

    if (!handleFreeWord) return

    handleFreeWord(name, value)
  }

  const handleFreeWord: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleSearch('recordChange', event.target.value)
    }
  }

  useEffect(() => {
    const start_form = fromDate ? fromDate : dayjs('2023-01-01').toDate()
    const end_date = toDate ?  dayjs(toDate).endOf('date').toDate() : dayjs().endOf('date').toDate()

    handleChangeDate({
      fromDate: convertDateToISOString(start_form),
      toDate: convertDateToISOString(end_date),
    })
  }, [fromDate, toDate])

  return (
    <HistoryWrapper>
      <FormWrapper>
        <FlexBox gap={'8px'}>
          <AppTextField
            label={'Search'}
            size="small"
            sx={{
              width: '203px',

              '& .MuiInputBase-root': {
                paddingRight: 0,
              },
            }}
            onKeyUp={handleFreeWord}
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon
                      sx={{ fontSize: '16px' }}
                      onClick={() => {
                        handleSearch('recordChange', searchField)
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AppDateField
            label={'From date'}
            onChange={(value) => {
              setFromDate(value)
            }}
            format="dd/MM/yyyy"
            sx={{
              width: '160px',
            }}
            textFieldProps={{
              fullWidth: true,
              size: 'small',
            }}
          />
          <AppDateField
            label={'To date'}
            onChange={(value) => {
              setToDate(value)
            }}
            format="dd/MM/yyyy"
            sx={{
              width: '160px',
            }}
            textFieldProps={{
              fullWidth: true,
              size: 'small',
            }}
          />
        </FlexBox>
      </FormWrapper>
      <LogsWrapper>
        <AuditLogComponent ref={refLog} module={module} />
      </LogsWrapper>
    </HistoryWrapper>
  )
}

export default HistoryLogAuditTrails
