import { ListFiltersData } from '../interface'
import { ISearchData } from './useSearchList'
export type ModuleProject =
  | 'jobs'
  | 'opening-job'
  | 'candidate'
  | 'candidate-black-list'
  | 'rec-team'
  | 'hiring-team'
  | 'skill'
  | 'role-template'
  | 'email-template'
  | 'job-position'
  | 'users'
  | 'application'

export type StorageFilter<T> = {
  filter?: ListFiltersData<T>
  search?: ISearchData
}
type CacheData<T> = {
  [x in ModuleProject]: StorageFilter<T>
}
function useStoreData<T>() {
  const storeKey = 'trec-data-filter'

  function handleFilterStorage(key: ModuleProject, data: StorageFilter<T>) {
    const storedData = getAllData()
    const removeData = {
      search: data?.search ? data.search : undefined,
      filter: data?.filter ? data.filter : undefined,
    }
    const newData = {
      ...storedData,
      [key]: {
        ...removeData,
      },
    }
    localStorage.setItem(storeKey, JSON.stringify(newData))
  }

  function getData(key: ModuleProject): StorageFilter<T> | undefined {
    const data = localStorage.getItem(storeKey)
    if (data) {
      const moduleData = JSON.parse(data)
      return moduleData[key] ?? undefined
    }
  }

  function getAllData(): CacheData<T> | undefined {
    const data = localStorage.getItem(storeKey)
    if (data) {
      const moduleData = JSON.parse(data)
      return moduleData
    }
  }

  function deleteAllData(): boolean {
    try {
      localStorage.removeItem(storeKey)
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getData,
    handleFilterStorage,
    deleteAllData,
  }
}

export default useStoreData
