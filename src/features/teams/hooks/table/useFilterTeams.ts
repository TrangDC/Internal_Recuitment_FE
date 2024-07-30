import { useFilterTable } from 'shared/components/table'

function useFilterTeams() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
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

export default useFilterTeams
