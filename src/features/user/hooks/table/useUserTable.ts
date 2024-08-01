import useGraphql from 'features/user/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useUserTable = (props: IUseCustomCommonTable) => {
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

export default useUserTable
