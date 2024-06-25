import useSearchList from 'shared/components/table/hooks/useSearchList'

function useFilterSkillType() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name', 'phone', 'phone'],
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterSkillType
