import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import axiosInstance from 'shared/utils/axios'

const useInterviewTable = () => {
  const { getAllTeam, queryKey } = useGraphql()
  const useTableReturn = useCustomTable({
    buildQuery: getAllTeam,
    variables: {},
    queryKey,
  })

  return {
    useTableReturn,
  }
}

export const mockApiGetListInterview= async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/interviewer';

  return await axiosInstance.get(url);
}

export default useInterviewTable