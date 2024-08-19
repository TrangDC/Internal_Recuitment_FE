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
      />
      <AppDateField
        value={filters?.fromDate}
        onChange={(value) => handleOnChangeDate('fromDate', value)}
      />
      <AppDateField
        value={filters?.toDate}
        onChange={(value) => handleOnChangeDate('toDate', value)}
      />
    </FlexBox>
  )
}

export default BoxFilter
