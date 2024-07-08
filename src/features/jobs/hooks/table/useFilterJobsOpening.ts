import { OPENING_PAGE_JOB } from 'features/jobs/shared/constants'
import { JobsFilterOpening } from 'features/jobs/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterJobsOpening() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<JobsFilterOpening>({
    filter: {
      defaultFilter: {
        hiring_job_id: [],
        priority: '',
        team_id: [],
        skill_id: [],
        location: '',
        created_by_ids: [],
        page_job: OPENING_PAGE_JOB.list_job,
      },
      formatDataWithValue: (data) => {
        return {
          priority: Number(data?.priority?.value) || undefined,
          hiring_job_id: !isEmpty(data?.hiring_job_id) ? data?.hiring_job_id?.map((o) => o.value) : undefined,
          team_id: !isEmpty(data?.team_id) ? data?.team_id?.map((o) => o.value) : undefined,
          skill_id: !isEmpty(data?.skill_id) ? data?.skill_id?.map((o) => o.value) : undefined,
          location: data?.location?.value || undefined,
          created_by_ids: !isEmpty(data?.created_by_ids) ? data?.created_by_ids?.map((o) => o.value) : undefined,
          page_job: data?.page_job?.value ?? OPENING_PAGE_JOB.list_job,
        }
      },
    },
    page: 'opening-job',
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
