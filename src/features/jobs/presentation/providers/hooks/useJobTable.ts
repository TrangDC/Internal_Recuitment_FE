import useGraphql from 'features/jobs/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useJobTable = () => {
  const { getAllJob, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllJob,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useJobTable