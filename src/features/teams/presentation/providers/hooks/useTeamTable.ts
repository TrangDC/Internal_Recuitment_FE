import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useTeamTable = () => {
  const { getAllTeam, queryKey } = useGraphql()

  const useTableReturn = useCustomTable({
    buildQuery: getAllTeam,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useTeamTable
