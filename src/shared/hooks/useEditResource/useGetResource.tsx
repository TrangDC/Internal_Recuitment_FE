import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { FieldValues, Resolver, useForm } from 'react-hook-form'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

export interface IuseGetResource<Response, FormData> {
  id: string
  queryKey: string[]
  oneBuildQuery: IBuildQueryReturn
  formatDefaultValues?: (data: Response) => FormData
  resolver?: Resolver<FormData & FieldValues, any> | undefined
}
function useGetResource<Response, FormData extends FieldValues>({
  id,
  queryKey,
  oneBuildQuery,
  formatDefaultValues,
  resolver,
}: IuseGetResource<Response, FormData>) {
  const { data, isLoading } = useQuery({
    queryKey: queryKey.concat([id]),
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(oneBuildQuery.query, {
        id: id,
      }),
  })

  const formatData = useMemo(() => {
    if (data && isRight(data) && !isLoading) {
      return unwrapEither(data)?.[oneBuildQuery.operation]?.data
    }
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading])

  const useFormReturn = useForm<FormData>({
    mode: 'onChange',
    defaultValues: formatData,
    resolver,
  })

  const { reset } = useFormReturn

  useEffect(() => {
    if (formatData) {
      reset(formatDefaultValues ? formatDefaultValues(formatData) : formatData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatData])

  return {
    useFormReturn,
    isGetting: isLoading,
  }
}

export default useGetResource
