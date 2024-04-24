import useGraphql from 'features/teams/domain/graphql/graphql'
import useCustomTable, { IuseCustomTableReturn } from 'shared/hooks/useCustomTable'
import axiosInstance from 'shared/utils/axios'

const useJobTable = () => {
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
  const url = '/api/teams';

  return await axiosInstance.get(url);
}
export default useJobTable