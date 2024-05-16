import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import SearchInput from 'shared/components/input-fields/SearchInput'
import useTextTranslation from 'shared/constants/text'
import { KeyboardEventHandler, useRef } from 'react'
import { converDateToISOString } from 'shared/utils/utils'
import AuditLogComponent from 'features/auditTrails/presentation/page-sections/AuditLogComponent'
import { FormWrapper, HistoryWrapper, LogsWrapper } from '../../providers/styles'

interface Props {
    module: string,
}

const HistoryLogAuditTrails = ({module}: Props) => {
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
            sx={{ width: '203px', maxWidth: '100%', padding: '0 4px' }}
            icon_style={{fontSize: 16}}
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
        <AuditLogComponent ref={refLog} module={module} />
      </LogsWrapper>
    </HistoryWrapper>
  )
}

export default HistoryLogAuditTrails