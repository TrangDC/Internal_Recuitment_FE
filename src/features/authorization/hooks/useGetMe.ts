import useGraphql from '../domain/graphql/graphql'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import useAuth from 'features/authentication/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import PermissionStructureImpl from '../domain/interfaces/permission-refactor'
import { MyBasicInformation } from '../domain/interfaces'
import handleAuthLocalStorage from 'services/auth-local-storage-service'
import GraphQLClientService from 'services/graphql-service'
import User from 'shared/schema/database/user'

function useGetMe() {
  const { getMe, queryKey } = useGraphql()
  const { authState } = useAuth()
  const { getToken } = handleAuthLocalStorage()
  const { data, isFetching, refetch } = useQuery({
    queryKey: [queryKey, 'me'],
    queryFn: async () => GraphQLClientService.fetchGraphQL(getMe.query),
    enabled: authState === 'IS_AUTHENTICATED' && !!getToken(),
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
        teamId: me?.hiring_team?.id ?? '',
        rectTeamId:me?.member_of_rec_team?.id ?? '',
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
