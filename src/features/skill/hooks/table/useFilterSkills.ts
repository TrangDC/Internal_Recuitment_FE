import { useFilterTable } from 'shared/components/table'

function useFilterSkills() {
  const { useSearchListReturn } = useFilterTable({
    search: {
      searchKey: ['name'],
    },
    page: 'skill',
    shouldCacheData: true,
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterSkills
