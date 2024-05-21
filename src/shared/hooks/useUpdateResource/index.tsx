import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form'
import NotificationService from 'services/notification-service'
import GraphQLClientService, { IbuildQueryReturn } from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'

interface IuseUpdateResource<P> {
  mutationKey: string[]
  queryString: IbuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  defaultValues?: DefaultValues<P>
  resolver: Resolver<P & FieldValues, any> | undefined
}

function useUpdateResource<T, P extends FieldValues>({
  mutationKey,
  queryString,
  defaultValues,
  resolver,
  onError,
  onSuccess,
}: IuseUpdateResource<P>) {
  const queryClient = useQueryClient()
  const useFormReturn = useForm<P>({
    defaultValues,
    mode: 'onChange',
    resolver: resolver,
  })
  const useCreateReturn = useMutation({
    mutationKey,
    mutationFn: (payload: BaseRecord) => {
      const { id, note, ...otherInput} = payload;

      return GraphQLClientService.fetchGraphQL(queryString.query, {
        input: otherInput,
        id,
        note,
      })
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        return NotificationService.showError(t(unwrapEither(data).message))
      }
      queryClient.invalidateQueries({ queryKey: mutationKey })
      onSuccess?.(unwrapEither(data))
      return NotificationService.showSuccess('EDIT')
    },
    onError(error) {
      onError?.(error)
      NotificationService.showError(error.message)
    },
  })
  return {
    useCreateReturn,
    useFormReturn,
  }
}

export default useUpdateResource
