import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form'
import NotificationService from 'services/notification-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>

interface IUseCreateResource<P> {
  mutationKey: string[]
  queryString: IBuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  defaultValues?: DefaultValues<P> | AsyncDefaultValues<P>
  resolver: Resolver<P & FieldValues, any> | undefined
  show_modal?: boolean
}

function useCreateResource<T, P extends FieldValues>({
  mutationKey,
  queryString,
  defaultValues,
  resolver,
  onError,
  onSuccess,
  show_modal = true,
}: IUseCreateResource<P>) {
  const { handleSuccess, handleFailed } = usePopup()

  const queryClient = useQueryClient()
  const useFormReturn = useForm<P>({
    defaultValues,
    mode: 'onChange',
    resolver: resolver,
  })
  const useCreateReturn = useMutation({
    mutationKey,
    mutationFn: (payload: T) => {
      return GraphQLClientService.fetchGraphQL(
        queryString,
        payload as BaseRecord
      )
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        if(onError) {
          return onError?.(unwrapEither(data))
        }
        // return NotificationService.showError(t(unwrapEither(data).message))
        return handleFailed({
          title: NotificationService.generateMessageFailed('CREATE'),
          content: t(unwrapEither(data).message) as string,
        })
      }
      queryClient.invalidateQueries({ queryKey: mutationKey })
      onSuccess?.(unwrapEither(data))
     
      if (show_modal) {
        return handleSuccess({
          title: NotificationService.generateMessage('CREATE'),
        })
      }
      // return NotificationService.showSuccess('CREATE')
    },
    onError(error) {
      if(onError) {
        return  onError?.(error);
      }
      // NotificationService.showError(error.message)
      return handleFailed({
        title: NotificationService.generateMessageFailed('CREATE'),
        content: t(error.message) as string,
      })
    },
  })
  return {
    useCreateReturn,
    useFormReturn,
  }
}

export default useCreateResource
