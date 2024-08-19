import dayjs, { Dayjs } from 'dayjs'
import { useRef, useState } from 'react'

export type CandidateActivityFilters = {
  search: string
  fromDate: Dayjs | null
  toDate: Dayjs | null
}

function useActivityFilter() {
  const [filters, setFilters] = useState<CandidateActivityFilters>({
    search: '',
    fromDate: null,
    toDate: null,
  })
  const searchRef = useRef(null)
  const handleSearch = () => {
    if (!searchRef?.current) return
    const text = (searchRef.current as HTMLInputElement).value
    setFilters((prev) => ({
      ...prev,
      search: text,
    }))
  }

  const handleOnChangeDate = (
    key: 'fromDate' | 'toDate',
    value: Dayjs | null
  ) => {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  console.log('filters', filters)
  return {
    handleSearch,
    filters,
    searchRef,
    handleOnChangeDate,
  }
}

export default useActivityFilter
