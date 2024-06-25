import useGraphql from 'features/candidates/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useCandidateTable = (props: IUseCustomCommonTable) => {
  const { getAllCandidates, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidates,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useCandidateTable
