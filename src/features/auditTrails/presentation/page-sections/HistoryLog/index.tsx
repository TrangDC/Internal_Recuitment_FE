import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import useTextTranslation from 'shared/constants/text'
import { KeyboardEventHandler, useRef, useState } from 'react'
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

interface Props {
  module: string
}

const HistoryLogAuditTrails = ({ module }: Props) => {
  const [searchField, setSearchField] = useState('')

  const refLog = useRef<{
    handleFilter: (name: string, value: string | null) => void
    handleFreeWord: (name: string, value: string) => void
  }>()

  const handleChangeDate = (name: string, value: Date) => {
   
    const handleFilter = refLog?.current?.['handleFilter']

    if (!handleFilter) return
    handleFilter(name, value ? convertDateToISOString(value.toString()) : value)
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

  return (
    <HistoryWrapper>
      <FormWrapper>
        <FlexBox gap={'8px'}>
          <AppTextField
            label={'Search'}
            // required
            size="small"
            sx={{ width: '203px',

            '& .MuiInputBase-root': {
              paddingRight: 0,
            }
            }}
            // fullWidth
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
              handleChangeDate('fromDate', value as Date)
            }}
            format="dd/MM/yyyy"
            sx={{
              width: '160px'
            }}
            textFieldProps={{
              fullWidth: true,
              size: 'small',
            }}
          />
           <AppDateField
            label={'To date'}
            onChange={(value) => {
              handleChangeDate('toDate', value as Date)
            }}
            format="dd/MM/yyyy"
            sx={{
              width: '160px'
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
