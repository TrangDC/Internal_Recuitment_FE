import useGraphql from 'features/candidates/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useCandidateTable = () => {
  const { getAllCandidates, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidates,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useCandidateTable