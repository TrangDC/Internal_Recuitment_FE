import useSearchList from 'shared/components/table/hooks/useSearchList'

function useFilterSkills() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name'],
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterSkills
