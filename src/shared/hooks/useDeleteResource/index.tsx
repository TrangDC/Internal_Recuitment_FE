import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form'
import NotificationService from 'services/notification-service'
import GraphQLClientService, { IbuildQueryReturn } from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'

interface IuseDeleteResource<P> {
  mutationKey: string[]
  queryString: IbuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  defaultValues?: DefaultValues<P>
  resolver: Resolver<P & FieldValues, any> | undefined
  showErrorMsg?: boolean,
}

function useDeleteResource<T, P extends FieldValues>({
  mutationKey,
  queryString,
  defaultValues,
  resolver,
  onError,
  onSuccess,
  showErrorMsg = true,
}: IuseDeleteResource<P>) {
  const queryClient = useQueryClient()
  const useFormReturn = useForm<P>({
    defaultValues,
    mode: 'onChange',
    resolver: resolver,
  })
  const useCreateReturn = useMutation({
    mutationKey,
    mutationFn: (payload: BaseRecord) => {
      const { id, note } = payload;

      return GraphQLClientService.fetchGraphQL(queryString.query, {
        id,
        note,
      })
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        return showErrorMsg && NotificationService.showError(t(unwrapEither(data).message))
      }
      queryClient.invalidateQueries({ queryKey: mutationKey })
      onSuccess?.(unwrapEither(data))
      return NotificationService.showSuccess('DELETE')
    },
    onError(error) {
      console.log("check")
      onError?.(error)
      showErrorMsg && NotificationService.showError(error.message)
    },
  })
  return {
    useCreateReturn,
    useFormReturn,
  }
}

export default useDeleteResource
