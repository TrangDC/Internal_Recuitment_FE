import { OPENING_PAGE_JOB } from 'features/jobs/shared/constants'
import { JobsFilterOpening } from 'features/jobs/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterJobsOpening() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<JobsFilterOpening>({
      filter: {
        defaultFilter: {
          hiring_job_ids: [],
          priority: '',
          hiring_team_ids: [],
          skill_id: [],
          location: '',
          created_by_ids: [],
          page_job: OPENING_PAGE_JOB.list_job,
        },
        formatDataWithValue: (data) => {
          return {
            priority: Number(data?.priority?.value) || undefined,
            hiring_job_ids: !isEmpty(data?.hiring_job_ids)
              ? data?.hiring_job_ids?.map((o) => o.value)
              : undefined,
            hiring_team_ids: !isEmpty(data?.hiring_team_ids)
              ? data?.hiring_team_ids?.map((o) => o.value)
              : undefined,
            skill_id: !isEmpty(data?.skill_id)
              ? data?.skill_id?.map((o) => o.value)
              : undefined,
            location: data?.location?.value || undefined,
            created_by_ids: !isEmpty(data?.created_by_ids)
              ? data?.created_by_ids?.map((o) => o.value)
              : undefined,
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
