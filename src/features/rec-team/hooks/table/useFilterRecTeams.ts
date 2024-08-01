import { RecTeamFilter } from 'features/rec-team/shared/constants/schema-filter'
import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterRecTeams() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable<RecTeamFilter>({
    filter: {
      defaultFilter: {
        leader_ids: [],
      },
      formatDataWithValue: (data) => {
        return {
          leader_ids:
          !isEmpty(data?.leader_ids)
          ? data?.leader_ids?.map((o) => o.value)
          : undefined,
        }
      },
    },
    search: {
      searchKey: ['name'],
    },
    page: 'teams',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterRecTeams
