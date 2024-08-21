import { useCandidateActivityContext } from 'features/candidates/shared/context/CandidateActivityContext'
import FlexBox from 'shared/components/flexbox/FlexBox'
import AppDateField from 'shared/components/input-fields/AppDateField'
import SearchInput from 'shared/components/table/components/SearchInput'

function BoxFilter() {
  const { handleSearch, searchRef, handleOnChangeDate, filters } =
    useCandidateActivityContext()
  return (
    <FlexBox gap={2}>
      <SearchInput
        onEnter={handleSearch}
        onSearch={handleSearch}
        ref={searchRef}
        placeholder="Search"
      />
      <AppDateField
        value={filters?.fromDate}
        onChange={(value) => handleOnChangeDate('fromDate', value)}
        label="From date"
      />
      <AppDateField
        value={filters?.toDate}
        onChange={(value) => handleOnChangeDate('toDate', value)}
        label="To date"
      />
    </FlexBox>
  )
}

export default BoxFilter
