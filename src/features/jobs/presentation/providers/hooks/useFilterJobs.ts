import { JobsFilter } from '../constants/schema-filter'
import { useFilterTable } from 'shared/components/table'

function useFilterJobs() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<JobsFilter>({
    filter: {
      defaultFilter: {
        team_ids: [],
        priority: '',
        status: '',
      },
      formatDataWithValue: (data) => {
        return {
          priority: Number(data?.priority?.value) || undefined,
          status: data?.status?.value,
          team_ids: data?.team_ids?.map((o) => o.value),
        }
      },
    },
    page: 'jobs',
    search: {
      searchKey: ['name'],
    },
    shouldCacheData: true,
  })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterJobs
