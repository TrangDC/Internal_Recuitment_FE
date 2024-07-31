import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from 'services/notification-service'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import GraphQLClientService, {
  IBuildQueryReturn,
} from 'services/graphql-service'
import {
  UpdateCandidateInterviewStatusArguments,
  UpdateCandidateInterviewStatusInput,
} from 'shared/schema/database/candidate_interview'

interface IuseChangeStatusCandidateInterview {
  editBuildQuery: IBuildQueryReturn
  id: string
  queryKey: string[]
  onSuccess?: (data: BaseRecord) => void
  onError?: (data: ErrorException | Error) => void
}

function useChangeInterviewStatus({
  id,
  editBuildQuery,
  queryKey,
  onSuccess,
  onError,
}: IuseChangeStatusCandidateInterview) {
  const queryClient = useQueryClient()

  const useEditReturn = useMutation({
    mutationKey: queryKey,
    mutationFn: (payload: UpdateCandidateInterviewStatusArguments) => {
      return GraphQLClientService.fetchGraphQL(
        editBuildQuery.query,
        payload as BaseRecord
      )
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
  function handleChangeStatus(input: UpdateCandidateInterviewStatusInput) {
    mutate({
      id,
      input,
      note: '',
    })
  }

  return {
    useEditReturn,
    handleChangeStatus,
  }
}

export default useChangeInterviewStatus
