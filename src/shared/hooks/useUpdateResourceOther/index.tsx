import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form'
import NotificationService from 'services/notification-service'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'

interface IuseUpdateResourceOther<P> {
  mutationKey: string[]
  queryString: IBuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  defaultValues?: DefaultValues<P>
  resolver: Resolver<P & FieldValues, any> | undefined
}

function useUpdateResourceOther<T, P extends FieldValues>({
  mutationKey,
  queryString,
  defaultValues,
  resolver,
  onError,
  onSuccess,
}: IuseUpdateResourceOther<P>) {
  const queryClient = useQueryClient()
  const useFormReturn = useForm<P>({
    defaultValues,
    mode: 'onChange',
    resolver: resolver,
  })
  const useUpdateReturn = useMutation({
    mutationKey,
    mutationFn: (payload: Record<string, any>) => {
      return GraphQLClientService.fetchGraphQL(queryString.query, {
        ...payload,
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
    useUpdateReturn,
    useFormReturn,
  }
}

export default useUpdateResourceOther
