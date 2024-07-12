import { useFilterTable } from 'shared/components/table'

function useFilterEmail() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
    search: {
      searchKey: ['subject'],
    },
    page: 'email-template',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterEmail
