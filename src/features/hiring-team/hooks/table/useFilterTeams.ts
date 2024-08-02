import { isEmpty } from 'lodash'
import { useFilterTable } from 'shared/components/table'

function useFilterTeams() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
    filter: {
      defaultFilter: {
        manager_ids: [],
      },
      formatDataWithValue: (data) => {
        return {
          manager_ids: !isEmpty(data?.manager_ids)
            ? data?.manager_ids?.map((o) => o.value)
            : undefined,
        }
      },
    },
    search: {
      searchKey: ['name'],
    },
    page: 'hiring-team',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterTeams
