import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/calendars/domain/graphql'
import GraphQLClientService from 'services/graphql-service'
import NotificationService from 'services/notification-service'
import { BaseRecord } from 'shared/interfaces/common'
import ErrorException from 'shared/interfaces/response'
import { UpdateCandidateInterviewScheduleArguments } from 'shared/schema/database/candidate_interview'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'

interface IUseDragDropInterview {
  onSuccess?: (data: BaseRecord) => void
  onError?: (data: ErrorException | Error) => void
}

function useDragDropInterview(props: IUseDragDropInterview) {
  const { onError } = props
  const { queryKey, updateCandidateInterviewSchedule } = useGraphql()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (payload: UpdateCandidateInterviewScheduleArguments) =>
      GraphQLClientService.fetchGraphQL(
        updateCandidateInterviewSchedule.query,
        { ...payload }
      ),
    onSuccess: (data) => {
      if (isLeft(data)) {
        onError?.(unwrapEither(data))
        return NotificationService.showError(unwrapEither(data).message)
      }
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      })
    },
    onError(error) {
      onError?.(error)
      NotificationService.showError(error.message)
    },
  })

  function onDragDropInterview(
    payload: UpdateCandidateInterviewScheduleArguments
  ) {
    mutate(payload)
  }
  return {
    onDragDropInterview,
  }
}

export default useDragDropInterview
