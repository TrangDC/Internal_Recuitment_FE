import { useFilterTable } from 'shared/components/table'

function useFilterRoleTemplate() {
  const { useFilterReturn, useSearchListReturn } = useFilterTable({
    search: {
      searchKey: ['name'],
    },
    page: 'role-template',
    shouldCacheData: true,
  })
  return {
    useFilterReturn,
    useSearchListReturn,
  }
}

export default useFilterRoleTemplate
