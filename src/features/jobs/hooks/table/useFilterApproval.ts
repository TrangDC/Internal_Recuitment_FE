import { JobsFilterApprovals } from 'features/jobs/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterMyApprovals() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<JobsFilterApprovals>({
      filter: {
        defaultFilter: {
          hiring_team_ids: [],
          priorities: [],
          rec_team_ids: [],
          job_position_ids: [],
          skill_ids: [],
          location: '',
          created_by_ids: [],
        },
        formatDataWithValue: (data) => {
          return {
            priorities: !isEmpty(data?.priorities)
              ? data?.priorities?.map((o) => o.value)
              : undefined,
            hiring_team_ids: !isEmpty(data?.hiring_team_ids)
              ? data?.hiring_team_ids?.map((o) => o.value)
              : undefined,
            rec_team_ids: !isEmpty(data?.rec_team_ids)
              ? data?.rec_team_ids?.map((o) => o.value)
              : undefined,
            job_position_ids: !isEmpty(data?.job_position_ids)
              ? data?.job_position_ids?.map((o) => o.value)
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

export default useFilterMyApprovals
