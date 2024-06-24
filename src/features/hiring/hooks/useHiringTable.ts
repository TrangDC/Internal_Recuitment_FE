import useGraphql from 'features/hiring/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'

const useTeamTable = () => {
  const { getAllHiringTeam, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllHiringTeam,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useTeamTable
