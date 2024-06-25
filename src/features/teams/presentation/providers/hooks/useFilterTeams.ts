import useSearchList from 'shared/components/table/hooks/useSearchList'

function useFilterTeams() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name'],
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterTeams
