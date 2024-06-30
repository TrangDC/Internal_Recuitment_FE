import { useEffect } from 'react'
import { UseFilter } from '../interface'
import useFilter from './useFilter'
import useSearchList, { IUseSearchList } from './useSearchList'
import useStoreData, { ModuleProject, StorageFilter } from './useStoreData'

interface UseFilterTableProps<T> {
  search?: IUseSearchList
  filter?: Omit<UseFilter<T>, 'cacheData'>
  page: ModuleProject
  shouldCacheData: boolean
}

function useFilterTable<T>(props: UseFilterTableProps<T>) {
  const { search, filter, page, shouldCacheData } = props
  const { getData, handleFilterStorage } = useStoreData<T>()
  const data = shouldCacheData ? getData(page) : undefined
  const cacheDataSearch = data?.search ? data?.search : search?.defaultSearch
  const searchKey = search ? search?.searchKey : []
  const cacheDataFilter = data?.filter
  const useSearchListReturn = useSearchList({
    ...search,
    searchKey,
    defaultSearch: cacheDataSearch,
  })

  const useFilterReturn = useFilter<T>({
    ...filter,
    cacheData: cacheDataFilter,
  })

  const { controlFilter } = useFilterReturn
  const { search: searhData, searchRef } = useSearchListReturn
  const { filter: filterData } = controlFilter

  useEffect(() => {
    const newData: StorageFilter<T> = { filter: filterData, search: searhData }
    handleFilterStorage(page, newData)
    if (searchRef.current && search) {
      ;(searchRef.current as HTMLInputElement).value =
        searhData?.[search.searchKey[0]] ?? ''
    }
  }, [filterData, searhData])

  return {
    useSearchListReturn: useSearchListReturn,
    useFilterReturn: useFilterReturn,
  }
}

export default useFilterTable
