import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
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
  ) => Promise<FormData> | FormData
  resolver?: Resolver<FormData & FieldValues, any> | undefined
}
function useGetResource<Response, FormData extends FieldValues>({
  id,
  queryKey,
  oneBuildQuery,
  formatDefaultValues,
  resolver,
}: IuseGetResource<Response, FormData>) {
  const queryClient = useQueryClient()
  const [isGetting, setIsGetting] = useState(false)
  const [formData, setFormData] = useState<Response>()
  async function getDataById(): Promise<Response | undefined> {
    setIsGetting(true)
    const data = await queryClient.fetchQuery({
      queryKey: [...queryKey, id],
      queryFn: async () =>
        GraphQLClientService.fetchGraphQL(oneBuildQuery, {
          id: id,
        }),
    })
    if (data && isRight(data)) {
      setIsGetting(false)
      return unwrapEither(data)?.[oneBuildQuery.operation]?.data as Response
    }
    setIsGetting(false)
    return undefined
  }

  const useFormReturn = useForm<FormData>({
    mode: 'onChange',
    defaultValues: async () => {
      const data = await getDataById()
      setFormData(data)
      const defaultValues = formatDefaultValues(data)
      if (defaultValues instanceof Promise) {
        return await defaultValues
      } else {
        return defaultValues
      }
    },
    resolver,
  })

  return {
    useFormReturn,
    isGetting: isGetting,
    formData: formData,
  }
}

export default useGetResource
