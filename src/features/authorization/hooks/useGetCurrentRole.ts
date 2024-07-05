import { useQuery } from '@tanstack/react-query'
import useGraphql from '../domain/graphql/graphql'
import GraphQLClientService from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'
import { User } from '../domain/interfaces/role'
import useAuth from 'features/authentication/presentation/providers/hooks/useAuth'

function useGetCurrentRole() {
  const { getMe, queryKey } = useGraphql()
  const { isAuthenticated } = useAuth()

  const { data, isFetching, isLoading } = useQuery({
    gcTime: 0,
    queryKey: [queryKey, 'me', isAuthenticated],
    enabled: isAuthenticated,
    queryFn: async () => GraphQLClientService.fetchGraphQL(getMe.query),
  })

  let myPermission: User | null
  if (data && isRight(data)) {
    const response = unwrapEither(data)
    myPermission = response?.[getMe.operation]?.data
  } else {
    myPermission = null
  }

  return {
    myPermission,
    isFetching,
    isLoading,
  }
}

export default useGetCurrentRole
