import { OPENING_PAGE_APPLICATION } from 'features/application/shared/constants'
import { ApplicationFilter } from 'features/application/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterJobsOpening() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<ApplicationFilter>({
      filter: {
        defaultFilter: {
          hiring_job_id: [],
          hiring_team_id: [],
          rec_id: [],
          level: '',
          status: '',
          page_job: OPENING_PAGE_APPLICATION.list_candidate,
        },
        formatDataWithValue: (data) => {
          return {
            status: data?.status?.value || undefined,
            hiring_job_id: !isEmpty(data?.hiring_job_id)
              ? data?.hiring_job_id?.map((o) => o.value)
              : undefined,
            hiring_team_id: !isEmpty(data?.hiring_team_id)
              ? data?.hiring_team_id?.map((o) => o.value)
              : undefined,
            rec_id: !isEmpty(data?.rec_id)
              ? data?.rec_id?.map((o) => o.value)
              : undefined,
            level: data?.level?.value || undefined,
            page_job:
              data?.page_job?.value ?? OPENING_PAGE_APPLICATION.list_candidate,
          }
        },
      },
      page: 'application',
      search: {
        searchKey: ['hiring_job'],
      },
      shouldCacheData: true,
    })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterJobsOpening
