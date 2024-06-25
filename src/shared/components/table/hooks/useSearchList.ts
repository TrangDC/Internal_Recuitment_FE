import { useRef, useState } from 'react'

export interface IUseSearchList {
  searchKey: string[]
  defaultSearch?: ISearchData
}

export interface ISearchData {
  [key: string]: string
}

function useSearchList({
  searchKey = ['name'],
  defaultSearch,
}: IUseSearchList) {
  const [search, setSearch] = useState<ISearchData>(defaultSearch ?? {})
  const searchRef = useRef(null)
  const handleSearch = () => {
    if (!searchRef?.current) return
    const text = (searchRef.current as HTMLInputElement).value?.toLowerCase()
    const searchMap = searchKey.reduce((a, v) => ({ ...a, [v]: text }), {})
    setSearch?.({
      ...searchMap,
    })
  }

  return {
    search,
    handleSearch,
    searchRef,
  }
}

export default useSearchList
