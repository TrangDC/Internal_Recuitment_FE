import { Box, styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import SearchInput from 'shared/components/input-fields/SearchInput'
import LogsComponent from '../LogComponent'
import useTextTranslation from 'shared/constants/text'
import { KeyboardEventHandler, useRef } from 'react'
import { converDateToISOString } from 'shared/utils/utils'

const HistoryWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '13px 16px 24px',
}))

const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const LogsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
}))

const HistoryLog = () => {
  const translation = useTextTranslation()
  const refLog = useRef<{
    handleFilter: (name: string, value: string) => void
    handleFreeWord: (name: string, value: string) => void
  }>()

  const handleChangeDate = (name: string, value: Date | null) => {
    const handleFilter = refLog?.current?.['handleFilter']

    if (!handleFilter || !value) return

    handleFilter(name, converDateToISOString(value.toString()))
  }

  const handleSearch = (name: string, value: string) => {
    const handleFreeWord = refLog?.current?.['handleFreeWord']

    if (!handleFreeWord || !value) return

    handleFreeWord(name, value)
  }

  const handleFreeWorld: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13) {
      //@ts-ignore
      handleSearch('recordChange', event.target.value)
    }
  }

  return (
    <HistoryWrapper>
      <FormWrapper>
        <FlexBox gap={'8px'}>
          <SearchInput
            size="small"
            position_icon="end"
            sx={{ width: '203px', maxWidth: '100%' }}
            onKeyUp={handleFreeWorld}
          />
          <AppDateField
            label={translation.COMMON.from_date}
            onChange={(value) => {
              handleChangeDate('fromDate', value)
            }}
          />
          <AppDateField
            label={translation.COMMON.to_date}
            onChange={(value) => {
              handleChangeDate('toDate', value)
            }}
          />
        </FlexBox>
      </FormWrapper>
      <LogsWrapper>
        <LogsComponent ref={refLog} />
      </LogsWrapper>
    </HistoryWrapper>
  )
}

export default HistoryLog
