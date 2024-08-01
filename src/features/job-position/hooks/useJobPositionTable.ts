import useGraphql from 'features/job-position/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useJobPositionTable = (props: IUseCustomCommonTable) => {
  const { getAllJobPositions, queryKey } = useGraphql()
  const { search, filters } = props

  const useTableReturn = useCustomTable({
    buildQuery: getAllJobPositions,
    queryKey,
    filters,
    search,
  })

  return {
    useTableReturn,
  }
}

export default useJobPositionTable
