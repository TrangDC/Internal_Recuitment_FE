import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useGraphql from './graphql'
import { PermissionGroup } from './interface/response'
import GraphQLClientService from 'services/graphql-service'

function useGetAllPermissionGroups() {
  const { getAllPermissionGroups, queryKey } = useGraphql()
  const queryClient = useQueryClient()
  const [isGetting, setIsGetting] = useState(false)
  async function getAllPermission(): Promise<PermissionGroup[]> {
    setIsGetting(true)
    const data = await queryClient.fetchQuery({
      queryKey: [queryKey],
      queryFn: async () =>
        GraphQLClientService.fetchGraphQL(getAllPermissionGroups.query),
    })
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const sortData =
        response?.[getAllPermissionGroups.operation]?.edges?.map(
          (item: any) => item?.node
        ) ?? []

      setIsGetting(false)
      return sortData
    }
    setIsGetting(false)
    return []
  }

  return {
    getAllPermission,
    isGetting,
  }
}

export default useGetAllPermissionGroups
