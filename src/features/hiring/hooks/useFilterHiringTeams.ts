import useSearchList from 'shared/components/table/hooks/useSearchList'

function useFilterHiringTeams() {
  const useSearchListReturn = useSearchList({
    searchKey: ['name', 'work_email'],
  })
  return {
    useSearchListReturn,
  }
}

export default useFilterHiringTeams
