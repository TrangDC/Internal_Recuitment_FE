import useGraphql from 'features/candidates/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useCandidateTable = (variables = {}) => {
  const { getAllCandidates, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidates,
    variables: {
      ...variables,
    },
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useCandidateTable
