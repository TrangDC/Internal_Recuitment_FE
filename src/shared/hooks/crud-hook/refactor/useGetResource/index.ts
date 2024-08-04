import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { FieldValues, Resolver, useForm } from 'react-hook-form'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import { isRight, unwrapEither } from 'shared/utils/handleEither'

export interface IuseGetResource<Response, FormData> {
  id: string
  queryKey: string[]
  oneBuildQuery: IBuildQueryReturn
  formatDefaultValues: (
    data: Response | undefined
  ) =>  FormData
  resolver?: Resolver<FormData & FieldValues, any> | undefined
}
function useGetResource<Response, FormData extends FieldValues>({
  id,
  queryKey,
  oneBuildQuery,
  formatDefaultValues,
  resolver,
}: IuseGetResource<Response, FormData>) {
  
  const  {data , isFetching } = useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () =>
      GraphQLClientService.fetchGraphQL(oneBuildQuery.query, {
        id: id,
      }),
  })

  const newData = useMemo(() => {
    if (data && isRight(data)) {
        const responseData = unwrapEither(data)?.[oneBuildQuery.operation]?.data as Response
        return responseData
    }
    return undefined
  },[data])
  

  const useFormReturn = useForm<FormData>({
    mode: 'onChange',
    resolver,
    values:formatDefaultValues(newData)
  })

  return {
    useFormReturn,
    isGetting: isFetching,
  }
}

export default useGetResource
