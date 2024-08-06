import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'

interface IuseDeleteResource {
  mutationKey: string[]
  queryString: IBuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
}

function useDeleteResource<Request>({
  mutationKey,
  queryString,
  onError,
  onSuccess,
}: IuseDeleteResource) {
  const { handleSuccess, handleFailed } = usePopup()

  const queryClient = useQueryClient()
  const useDeleteReturn = useMutation({
    mutationKey,
    mutationFn: (payload: Request) => {
      return GraphQLClientService.fetchGraphQL(
        queryString,
        payload as BaseRecord
      )
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        // return (
        //   showErrorMsg &&
        //   NotificationService.showError(t(unwrapEither(data).message))
        // )
        return handleFailed({
          title: NotificationService.generateMessageFailed('DELETE'),
          content: t(unwrapEither(data).message) as string,
        })
      }
      queryClient.invalidateQueries({ queryKey: mutationKey })
      onSuccess?.(unwrapEither(data))
      return handleSuccess({
        title: NotificationService.generateMessage('DELETE'),
      })
      // return NotificationService.showSuccess('DELETE')
    },
    onError(error) {
      onError?.(error)
      // showErrorMsg && NotificationService.showError(error.message)
      return handleFailed({
        title: NotificationService.generateMessageFailed('DELETE'),
        content: t(error.message) as string,
      })
    },
  })
  return {
    useDeleteReturn,
  }
}

export default useDeleteResource
