import { isEmpty } from 'lodash'
import { CandidateFilter } from '../../shared/constants/schema-filter'
import { useFilterTable } from 'shared/components/table'

type UseFilterCandidates = {
  is_black_list: boolean
}

function useFilterCandidates(props: UseFilterCandidates) {
  const { is_black_list } = props
  const { useSearchListReturn, useFilterReturn } =
    useFilterTable<CandidateFilter>({
      filter: {
        defaultFilter: {
          reference_uid: [],
          status: '',
          recruit_time_from_date: '',
          recruit_time_to_date: '',
          failed_reason: [],
          skill_ids: [],
          skill_type_ids: [],
          reference_type: '',
        },
        formatDataWithValue: (data) => {
          return {
            recruit_time_from_date:
              data?.recruit_time_from_date?.value ?? undefined,
            recruit_time_to_date:
              data?.recruit_time_to_date?.value ?? undefined,
            status: data?.status?.value,
            reference_uid: !isEmpty(data?.reference_uid)
              ? data?.reference_uid?.map((o) => o.value)
              : undefined,
            failed_reason: !isEmpty(data?.failed_reason)
              ? data?.failed_reason?.map((o) => o.value)
              : undefined,
            skill_ids: !isEmpty(data?.skill_ids)
              ? data?.skill_ids?.map((o) => o.value)
              : undefined,
            reference_type: data?.reference_type?.value ?? undefined,
            skill_type_ids: !isEmpty(data?.skill_type_ids)
              ? data?.skill_type_ids?.map((o) => o.value)
              : undefined,
          }
        },
      },
      page: is_black_list ? 'candidate-black-list' : 'candidate',
      search: {
        searchKey: ['name', 'phone', 'email'],
      },
      shouldCacheData: true,
    })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterCandidates
