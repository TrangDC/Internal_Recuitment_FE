import { useFilterTable } from 'shared/components/table'

function useFilterHiringTeams() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
    search: {
      searchKey: ['name', 'work_email'],
    },
    shouldCacheData: true,
    page: 'hiring-team',
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterHiringTeams
