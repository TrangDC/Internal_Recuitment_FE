import { OPENING_PAGE_APPLICATION } from 'features/application/shared/constants'
import { ApplicationFilter } from 'features/application/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterJobsOpening() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<ApplicationFilter>({
      filter: {
        defaultFilter: {
          hiring_job_ids: [],
          hiring_team_ids: [],
          rec_id: [],
          levels: [],
          status: '',
          page_job: OPENING_PAGE_APPLICATION.list_candidate,
        },
        formatDataWithValue: (data) => {
          return {
            status: data?.status?.value || undefined,
            hiring_job_ids: !isEmpty(data?.hiring_job_ids)
              ? data?.hiring_job_ids?.map((o) => o.value)
              : undefined,
              hiring_team_ids: !isEmpty(data?.hiring_team_ids)
              ? data?.hiring_team_ids?.map((o) => o.value)
              : undefined,
            rec_id: !isEmpty(data?.rec_id)
              ? data?.rec_id?.map((o) => o.value)
              : undefined,
            levels: !isEmpty(data?.levels)
              ? data?.levels?.map((o) => o.value)
              : undefined,
            page_job:
              data?.page_job?.value ?? OPENING_PAGE_APPLICATION.list_candidate,
          }
        },
      },
      page: 'application',
      search: {
        searchKey: ['candidate_name', 'candidate_email'],
      },
      shouldCacheData: true,
    })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterJobsOpening
