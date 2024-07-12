import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'
import { payloadDelete } from '../interfaces'
import usePopup from 'contexts/popupProvider/hooks/usePopup'

interface IuseDeleteResource {
  mutationKey: string[]
  queryString: IBuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  id: string
}

function useDeleteResource({
  mutationKey,
  queryString,
  onError,
  onSuccess,
  id,
}: IuseDeleteResource) {
  const { handleSuccess, handleFailed } = usePopup()

  const queryClient = useQueryClient()
  const useDeleteReturn = useMutation({
    mutationKey,
    mutationFn: (payload: payloadDelete) => {
      const { note } = payload
      return GraphQLClientService.fetchGraphQL(queryString.query, {
        id: id,
        note: note ?? '',
      })
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
