import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import useCustomTable from 'shared/components/table/hooks/useCustomTable'
import { IUseCustomCommonTable } from 'shared/components/table/interface'

const useApplyJobTable = (props: IUseCustomCommonTable) => {
  const { getAllCandidateJob, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidateJob,
    queryKey,
    ...props,
  })

  return {
    useTableReturn,
  }
}

export default useApplyJobTable
