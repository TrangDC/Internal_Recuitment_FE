import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { User } from '../domain/interfaces/role'
import useAuth from 'features/authentication/presentation/providers/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import PermissionStructureImpl from '../domain/interfaces/permission-refactor'
import { MyBasicInformation } from '../domain/interfaces'
import handleAuthLocalStorage from 'services/auth-local-storage-service'

function useGetMe() {
  const { getMe, queryKey } = useGraphql()
  const { isAuthenticated } = useAuth()
  const { getToken } = handleAuthLocalStorage()
  const { data, isFetching, refetch } = useQuery({
    queryKey: [queryKey, 'me'],
    queryFn: async () => GraphQLClientService.fetchGraphQL(getMe.query),
    enabled: isAuthenticated && !!getToken(),
  })

  const { myPermission, me } = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      const me: User = response?.[getMe.operation]?.data
      const myPermission = PermissionStructureImpl.fromJson(
        me.entity_permissions
      )
      const myBasicInformation: MyBasicInformation = {
        email: me?.work_email ?? '',
        name: me?.name ?? '',
        id: me?.id ?? '',
        teamId: me?.team.id ?? '',
      }
      return {
        myPermission,
        me: myBasicInformation,
      }
    }
    return {
      myPermission: null,
      me: null,
    }
  }, [data])

  return {
    me,
    myPermission,
    isFetching,
    refetch,
    data,
  }
}

export default useGetMe
