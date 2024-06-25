import useFilter from 'shared/components/table/hooks/useFilter'
import useSearchList from 'shared/components/table/hooks/useSearchList'
import { CandidateFilter } from '../constants/schema-filter'

function useFilterCandidates() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name', 'phone', 'email'],
  })
  const useFilterReturn = useFilter<CandidateFilter>({
    defaultFilter: {
      reference_uid: [],
      status: '',
      recruit_time_from_date: '',
      recruit_time_to_date: '',
      failed_reason: [],
    },
    formatDataWithValue: (data) => {
      return {
        recruit_time_from_date:
          data?.recruit_time_from_date?.value ?? undefined,
        recruit_time_to_date: data?.recruit_time_to_date?.value ?? undefined,
        status: data?.status?.value,
        reference_uid: data?.reference_uid?.map((o) => o.value),
        failed_reason: data?.failed_reason?.map((o) => o.value),
      }
    },
  })
  return {
    useSearchListReturn,
    useFilterReturn,
  }
}

export default useFilterCandidates
