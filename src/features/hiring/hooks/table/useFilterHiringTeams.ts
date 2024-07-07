import { useFilterTable } from 'shared/components/table'
import { isEmpty } from 'lodash'
import { HiringTeamFilter } from 'features/hiring/shared/constants/schema-filter'

function useFilterHiringTeams() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<HiringTeamFilter>({
      filter: {
        defaultFilter: {
          team_id: [],
          role_id: [],
        },
        formatDataWithValue: (data) => {
          return {
            team_id: !isEmpty(data?.team_id)
              ? data?.team_id?.map((o) => o.value)
              : undefined,
            role_id: !isEmpty(data?.role_id)
              ? data?.role_id?.map((o) => o.value)
              : undefined,
          }
        },
      },
      page: 'hiring-team',
      search: {
        searchKey: ['name'],
      },
      shouldCacheData: true,
    })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterHiringTeams
