import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import axiosInstance from 'shared/utils/axios'

const useTeamTable = () => {
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

export const mockApiGetJobs = async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/jobs';

  return await axiosInstance.get(url);
}

export const mockApiGetListTeam = async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/getTeams';

  return await axiosInstance.get(url);
}

export const mockApiGetListLocation = async (): Promise<IuseCustomTableReturn> => {
  const url = '/api/get-locations';

  return await axiosInstance.get(url);
}

export default useTeamTable