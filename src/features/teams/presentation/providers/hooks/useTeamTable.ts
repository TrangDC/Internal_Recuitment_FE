import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useTeamTable = () => {
  const { getAllJobTitles, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllJobTitles,
    variables: {},
    queryKey,
  })
  return {
    useTableReturn,
  }
}

export default useTeamTable
