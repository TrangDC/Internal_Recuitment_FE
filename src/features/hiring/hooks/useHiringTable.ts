import useGraphql from 'features/hiring/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useHiringTable = (props: IUseCustomCommonTable) => {
  const { getAllHiringTeam, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllHiringTeam,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useHiringTable
