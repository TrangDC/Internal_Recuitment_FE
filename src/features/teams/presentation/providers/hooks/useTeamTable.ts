import useGraphql from 'features/teams/domain/graphql/teams_graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useTeamTable = () => {
  const { buildQueryReturn } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: buildQueryReturn,
    variables: {},
  })
  return {
    useTableReturn,
  }
}

export default useTeamTable
