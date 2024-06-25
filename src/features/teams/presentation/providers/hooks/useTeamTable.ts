import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useTeamTable = (props: IUseCustomCommonTable) => {
  const { getAllTeam, queryKey } = useGraphql()
  const { search, filters } = props

  const useTableReturn = useCustomTable({
    buildQuery: getAllTeam,
    queryKey,
    filters,
    search,
  })

  return {
    useTableReturn,
  }
}

export default useTeamTable
