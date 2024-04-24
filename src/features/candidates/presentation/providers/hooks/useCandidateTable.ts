import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import axiosInstance from 'shared/utils/axios'

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

export const mockApiGetCandiates = async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/candiates';

  return await axiosInstance.get(url);
}


export default useCandidateTable