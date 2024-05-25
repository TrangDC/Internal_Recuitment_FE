import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import { BaseRecord } from 'shared/interfaces'
import ErrorException from 'shared/interfaces/response'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { t } from 'i18next'

interface IuseDeleteResource {
  mutationKey: string[]
  queryString: IBuildQueryReturn
  onError?: (error: ErrorException | Error) => void
  onSuccess?: (data: BaseRecord) => void
  showErrorMsg?: boolean
  id: string
}

function useDeleteResource({
  mutationKey,
  queryString,
  onError,
  onSuccess,
  id,
  showErrorMsg = true,
}: IuseDeleteResource) {
  const queryClient = useQueryClient()
  const useDeleteReturn = useMutation({
    mutationKey,
    mutationFn: (payload?: BaseRecord) => {
      if (payload) {
        return GraphQLClientService.fetchGraphQL(queryString.query, {
          id: id,
          ...payload,
        })
      }
      return GraphQLClientService.fetchGraphQL(queryString.query, {
        id: id,
      })
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        return (
          showErrorMsg &&
          NotificationService.showError(t(unwrapEither(data).message))
        )
      }
      queryClient.invalidateQueries({ queryKey: mutationKey })
      onSuccess?.(unwrapEither(data))
      return NotificationService.showSuccess('DELETE')
    },
    onError(error) {
      onError?.(error)
      showErrorMsg && NotificationService.showError(error.message)
    },
  })
  return {
    useDeleteReturn,
  }
}

export default useDeleteResource
