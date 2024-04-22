import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'

const useCandidateTable = () => {
  const { getAllJobTitles, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllJobTitles,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export default useCandidateTable