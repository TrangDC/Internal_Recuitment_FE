import { useMutation, useQueryClient } from '@tanstack/react-query'
import GraphQLClientService, {
  IbuildQueryReturn,
} from 'services/refactor/graphql-service'
import NotificationService from 'services/notification-service'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import useGetResource, { IuseGetResource } from './useGetResource'
import { FieldValues, Resolver } from 'react-hook-form'

interface IuseEditResource<Response, FormData>
  extends IuseGetResource<Response, FormData> {
  editBuildQuery: IbuildQueryReturn
  id: string
  queryKey: string[]
  onSuccess?: (data: BaseRecord) => void
  onError?: (data: ErrorException | Error) => void
  resolver: Resolver<FormData & FieldValues, any> | undefined
}

function useEditResource<Response, FormData extends FieldValues, Input>({
  id,
  editBuildQuery,
  oneBuildQuery,
  queryKey,
  onSuccess,
  onError,
  resolver,
  formatDefaultValues,
}: IuseEditResource<Response, FormData>) {
  const queryClient = useQueryClient()
  const { useFormReturn, isGetting } = useGetResource<Response, FormData>({
    id: id,
    oneBuildQuery,
    queryKey: queryKey,
    resolver,
    formatDefaultValues,
  })

  const useEditReturn = useMutation({
    mutationKey: queryKey.concat(JSON.stringify(undefined)),
    mutationFn: (payload: Input) =>
      GraphQLClientService.fetchGraphQL(editBuildQuery.query, {
        id: id,
        input: payload,
      }),
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        return NotificationService.showError(unwrapEither(data).message)
      }
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      onSuccess?.(unwrapEither(data))
      return NotificationService.showSuccess('EDIT')
    },
    onError(error) {
      onError?.(error)
      NotificationService.showError(error.message)
    },
  })

  return {
    isGetting,
    useFormReturn,
    useEditReturn,
  }
}

export default useEditResource
