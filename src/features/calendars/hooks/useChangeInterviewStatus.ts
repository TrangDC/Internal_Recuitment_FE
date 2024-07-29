import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'

interface IuseChangeStatusCandidateInterview {
  editBuildQuery: IBuildQueryReturn
  id: string
  queryKey: string[]
  onSuccess?: (data: BaseRecord) => void
  onError?: (data: ErrorException | Error) => void
}

function useChangeInterviewStatus<Input>({
  id,
  editBuildQuery,
  queryKey,
  onSuccess,
  onError,
}: IuseChangeStatusCandidateInterview) {
  const queryClient = useQueryClient()

  const useEditReturn = useMutation({
    mutationKey: queryKey,
    mutationFn: (payload: Input) => {
      return GraphQLClientService.fetchGraphQL(editBuildQuery.query, {
        id,
        input: payload,
      })
    },
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
  const { mutate } = useEditReturn
  function handleChangeStatus(data: Input) {
    mutate(data)
  }

  return {
    useEditReturn,
    handleChangeStatus,
  }
}

export default useChangeInterviewStatus
