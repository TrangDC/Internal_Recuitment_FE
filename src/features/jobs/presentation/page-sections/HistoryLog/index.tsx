import { Box, styled } from '@mui/material'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import SearchInput from 'shared/components/input-fields/SearchInput'
import LogsComponent from '../LogComponent'
import useTextTranslation from 'shared/constants/text'

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
  const translation = useTextTranslation();

  return (
    <HistoryWrapper>
      <FormWrapper>
        <FlexBox gap={'8px'}>
          <SearchInput
            size="small"
            position_icon="end"
            sx={{ width: '203px', maxWidth: '100%' }}
          />
          <AppDateField label={translation.COMMON.from_date} />
          <AppDateField label={translation.COMMON.to_date} />
        </FlexBox>
      </FormWrapper>
      <LogsWrapper>
        <LogsComponent />
      </LogsWrapper>
    </HistoryWrapper>
  )
}

export default HistoryLog
