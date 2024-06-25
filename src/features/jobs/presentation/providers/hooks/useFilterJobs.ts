import useFilter from 'shared/components/table/hooks/useFilter'
import useSearchList from 'shared/components/table/hooks/useSearchList'
import { JobsFilter } from '../constants/schema-filter'

function useFilterJobs() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name'],
  })
  const useFilterReturn = useFilter<JobsFilter>({
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
  })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterJobs
