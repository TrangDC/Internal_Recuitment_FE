import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/DateField'
import { useRef } from 'react'
import { FormWrapper } from 'features/auditTrails/presentation/providers/styles'
import { useContextAuditTrails } from 'features/auditTrails/presentation/providers/context'
import SearchInput from 'shared/components/table/components/SearchInput'

const FilterAuditTrails = () => {
  const searchField = useRef<string>('')
  const { actions } = useContextAuditTrails()
  const { handleFreeWord, handleChangeFromDate, handleChangeToDate } = actions

  const handleChangeSearchField = (value: string) => {
    searchField.current = value
  }

  return (
    <FormWrapper>
      <FlexBox gap={'8px'}>
        <SearchInput
          //@ts-ignore
          ref={searchField}
          onEnter={() => {
            handleFreeWord({ recordChange: searchField.current })
          }}
          placeholder="Search"
          onSearch={() => {
            handleFreeWord({ recordChange: searchField.current })
          }}
          onChange={(event) => {
            handleChangeSearchField(event?.target?.value)
          }}
          sx={{
            width: '203px',
          }}
        />

        <AppDateField
          label={'From date'}
          onChange={(value) => {
            handleChangeFromDate(value)
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
            handleChangeToDate(value)
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
  )
}

export default FilterAuditTrails
