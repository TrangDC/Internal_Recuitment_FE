import { useFilterTable } from 'shared/components/table'
import { isEmpty } from 'lodash'
import { HiringTeamFilter } from 'features/user/shared/constants/schema-filter'
import { TeamType } from 'shared/components/autocomplete/team-type-auto-complete'

function useFilterUser() {
  const { useFilterReturn, useSearchListReturn } =
    useFilterTable<HiringTeamFilter>({
      filter: {
        defaultFilter: {
          hiring_team_id: [],
          role_id: [],
          rec_team_ids: [],
          team_type: TeamType.ALL,
        },
        formatDataWithValue: (data) => {
          return {
            hiring_team_id: !isEmpty(data?.hiring_team_id)
              ? data?.hiring_team_id?.map((o) => o.value)
              : undefined,
            role_id: !isEmpty(data?.role_id)
              ? data?.role_id?.map((o) => o.value)
              : undefined,
            rec_team_ids: !isEmpty(data?.rec_team_ids)
              ? data?.rec_team_ids?.map((o) => o.value)
              : undefined,
            team_type: data?.team_type?.value,
          }
        },
      },
      page: 'users',
      search: {
        searchKey: ['name', 'work_email'],
      },
      shouldCacheData: true,
    })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterUser
