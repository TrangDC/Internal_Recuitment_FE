import { isEmpty } from 'lodash'
import { JobsFilter } from '../../shared/constants/schema-filter'
import { useFilterTable } from 'shared/components/table'

function useFilterJobs() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<JobsFilter>({
    filter: {
      defaultFilter: {
        team_ids: [],
        priority: '',
        status: '',
        skill_ids: [],
        location: '',
        created_by_ids: [],
      },
      formatDataWithValue: (data) => {
        return {
          priority: Number(data?.priority?.value) || undefined,
          status: data?.status?.value,
          team_ids: !isEmpty(data?.team_ids)
            ? data?.team_ids?.map((o) => o.value)
            : undefined,
          skill_ids: !isEmpty(data?.skill_ids)
            ? data?.skill_ids?.map((o) => o.value)
            : undefined,
          location: data?.location?.value || undefined,
          created_by_ids: !isEmpty(data?.created_by_ids)
            ? data?.created_by_ids?.map((o) => o.value)
            : undefined,
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
