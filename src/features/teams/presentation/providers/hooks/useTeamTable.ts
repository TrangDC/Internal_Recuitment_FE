import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useTeamTable = (variables = {}) => {
  const { getAllTeam, queryKey } = useGraphql()

  const useTableReturn = useCustomTable({
    buildQuery: getAllTeam,
    variables: {...variables},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useTeamTable
