import useGraphql from 'features/candidates/domain/graphql/graphql'
import useCustomTable from 'shared/hooks/useCustomTable'

const useApplyJobTable = (candidate_id: string) => {
  const { getAllCandidateJob, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllCandidateJob,
    variables: {
        filter: {candidate_id: candidate_id}
    },
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useApplyJobTable