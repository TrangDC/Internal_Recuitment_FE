import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

export interface IuseGetDetail {
  id: string
  queryKey: string | string[]
  oneBuildQuery: IBuildQueryReturn
}
function useGetDetail<T>({ id, queryKey, oneBuildQuery }: IuseGetDetail) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(oneBuildQuery.query, {
        id,
      }),
  })

  const form_data: T = useMemo(() => {
    if (data && isRight(data)) {
      const response = unwrapEither(data)
      return response?.[oneBuildQuery.operation]?.data
    }
    return {}
  }, [data])

  return {
    isGetting: isLoading,
    formData: form_data,
  }
}

export default useGetDetail
