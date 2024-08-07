import useGraphql from 'features/jobs/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useJobTable = (props: IUseCustomCommonTable) => {
  const { getAllJob, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllJob,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useJobTable
