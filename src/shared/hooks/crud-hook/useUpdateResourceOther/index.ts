import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import { FieldValues, Resolver } from 'react-hook-form'
import useGetResource, { IuseGetResource } from '../useGetResource'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import { t } from 'i18next'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
interface IuseEditResource<Response, FormData>
  extends IuseGetResource<Response, FormData> {
  editBuildQuery: IBuildQueryReturn
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
  const { handleSuccess, handleFailed } = usePopup()
  const { useFormReturn, isGetting, formData } = useGetResource<
    Response,
    FormData
  >({
    id: id,
    oneBuildQuery,
    queryKey: queryKey,
    resolver,
    formatDefaultValues,
  })

  const useEditReturn = useMutation({
    mutationKey: queryKey,
    mutationFn: (payload: Input) => {
      return GraphQLClientService.fetchGraphQL(editBuildQuery, {
        id,
        ...payload,
      })
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        if (onError) {
          return onError?.(unwrapEither(data))
        }

        // return NotificationService.showError(t(unwrapEither(data).message))
        return handleFailed({
          title: NotificationService.generateMessageFailed('EDIT'),
          content: t(unwrapEither(data).message) as string,
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      if (onSuccess) {
        return onSuccess?.(unwrapEither(data))
      }

      // return NotificationService.showSuccess('EDIT')
      return handleSuccess({
        title: NotificationService.generateMessage('EDIT'),
      })
    },
    onError(error) {
      if (onError) {
        return onError?.(error)
      }

      // NotificationService.showError(error.message)
      return handleFailed({
        title: NotificationService.generateMessageFailed('EDIT'),
        content: t(error.message) as string,
      })
    },
  })

  return {
    isGetting,
    useFormReturn,
    useEditReturn,
    formData,
  }
}

export default useEditResource
