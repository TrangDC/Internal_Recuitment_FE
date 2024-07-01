import useSearchList from 'shared/components/table/hooks/useSearchList'

function useFilterSkillType() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name'],
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterSkillType
