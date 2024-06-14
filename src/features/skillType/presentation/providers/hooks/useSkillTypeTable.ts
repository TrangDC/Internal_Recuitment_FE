import useGraphql from 'features/candidates/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'

const useSkillTypeTable = (variables = {}) => {
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

export default useSkillTypeTable
