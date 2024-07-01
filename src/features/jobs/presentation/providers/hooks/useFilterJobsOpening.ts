import { isEmpty } from 'lodash'
import { JobsFilterOpening } from '../constants/schema-filter'
import { useFilterTable } from 'shared/components/table'

function useFilterJobsOpening() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<JobsFilterOpening>({
    filter: {
      defaultFilter: {
        hiring_job_id: [],
        priority: '',
        team_id: [],
        skill_ids: [],
        location: '',
        created_by_ids: [],
      },
      formatDataWithValue: (data) => {
        return {
          priority: Number(data?.priority?.value) || undefined,
          hiring_job_id: data?.hiring_job_id?.map((o) => o.value),
          team_id: !isEmpty(data?.team_id) ? data?.team_id?.map((o) => o.value) : undefined,
          skill_ids: data?.skill_ids?.map((o) => o.value),
          location: data?.location?.value || undefined,
          created_by_ids: !isEmpty(data?.created_by_ids) ? data?.created_by_ids?.map((o) => o.value) : undefined,
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

export default useFilterJobsOpening