import { isEmpty } from 'lodash'
import { JobsFilter } from '../../shared/constants/schema-filter'
import { useFilterTable } from 'shared/components/table'
import { VIEW_PAGE_JOB } from 'features/jobs/shared/constants'
import { REC_IN_CHARGE_STATE } from 'shared/components/autocomplete/rec-in-charge-auto-complete/hooks/useRecInCharge'

function useFilterJobs() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<JobsFilter>({
    filter: {
      defaultFilter: {
        hiring_team_ids: [],
        priorities: [],
        rec_team_ids: [],
        job_position_ids: [],
        rec_in_charge_ids: [],
        skill_ids: [],
        location: '',
        created_by_ids: [],
        status: '',
        page_job: VIEW_PAGE_JOB.list_all_job,
        unassigned: '',
      },
      formatDataWithValue: (data) => {
        const unassigned =
          Array.isArray(data?.rec_in_charge_ids) &&
          !isEmpty(data?.rec_in_charge_ids)
            ? data?.rec_in_charge_ids.some(
                (recInCharge) =>
                  recInCharge.value === REC_IN_CHARGE_STATE.unassigned
              )
            : undefined

        return {
          unassigned: unassigned ? unassigned : undefined,
          priorities: !isEmpty(data?.priorities)
            ? data?.priorities?.map((o) => o.value)
            : undefined,
          hiring_team_ids: !isEmpty(data?.hiring_team_ids)
            ? data?.hiring_team_ids?.map((o) => o.value)
            : undefined,
          rec_team_ids: !isEmpty(data?.rec_team_ids)
            ? data?.rec_team_ids?.map((o) => o.value)
            : undefined,
          rec_in_charge_ids: !isEmpty(data?.rec_in_charge_ids)
            ? data?.rec_in_charge_ids?.map((o) => o.value)
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
          status: data?.status?.value || undefined,
          page_job: data?.page_job?.value ?? VIEW_PAGE_JOB.list_all_job,
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
