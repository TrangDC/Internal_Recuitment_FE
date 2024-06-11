import { useMutation, useQueryClient } from '@tanstack/react-query'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/refactor/graphql-service'
import NotificationService from 'services/notification-service'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import { FieldValues, Resolver } from 'react-hook-form'
import useGetResource, { IuseGetResource } from '../useGetResource'
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

interface InputUpdate extends BaseRecord{
  note: string,
}

function useEditResource<Response, FormData extends FieldValues, Input extends InputUpdate>({
  id,
  editBuildQuery,
  oneBuildQuery,
  queryKey,
  onSuccess,
  onError,
  resolver,
  formatDefaultValues,
}: IuseEditResource<Response, FormData>) {
  const { handleSuccess, handleFailed } = usePopup()

  const queryClient = useQueryClient()
  const { useFormReturn, isGetting } = useGetResource<Response, FormData>({
    id: id,
    oneBuildQuery,
    queryKey: queryKey,
    resolver,
    formatDefaultValues,
  })

  const useEditReturn = useMutation({
    mutationKey: queryKey,
    mutationFn: (payload: Input) => {
      const { note, ...inputUpdate } = payload;
      return  GraphQLClientService.fetchGraphQL(editBuildQuery.query, {
        id: id,
        input: inputUpdate,
        note: note ?? ''
      })
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        // return NotificationService.showError(t(unwrapEither(data).message))
        return handleFailed({
          title: NotificationService.generateMessageFailed('EDIT'),
          content: t(unwrapEither(data).message) as string,
        })
      }
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })
      onSuccess?.(unwrapEither(data))
      // return NotificationService.showSuccess('EDIT')
      return handleSuccess({
        title: NotificationService.generateMessage('EDIT'),
      })
    },
    onError(error) {
      onError?.(error)
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
  }
}

export default useEditResource