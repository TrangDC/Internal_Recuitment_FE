import useGraphql from 'features/rec-team/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useRecTeamTable = (props: IUseCustomCommonTable) => {
  const { getAllRecTeam, queryKey } = useGraphql()
  const { search, filters } = props

  const useTableReturn = useCustomTable({
    buildQuery: getAllRecTeam,
    queryKey,
    filters,
    search,
  })

  return {
    useTableReturn,
  }
}

export default useRecTeamTable
