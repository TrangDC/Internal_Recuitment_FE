import { useFilterTable } from 'shared/components/table'

function useFilterJobPosition() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
    search: {
      searchKey: ['name'],
    },
    page: 'job-position',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterJobPosition
