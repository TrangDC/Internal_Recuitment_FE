import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import axiosInstance from 'shared/utils/axios'

const useTeamTable = () => {
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

export const mockApiGetHirings = async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/hiring';

  return await axiosInstance.get(url);
}

export default useTeamTable
