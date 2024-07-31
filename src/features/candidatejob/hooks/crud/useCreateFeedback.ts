import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleFailed } from 'contexts/popupProvider/actions'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useTranslation } from 'react-i18next'
import GraphQLClientService from 'services/graphql-service'
import NotificationService from 'services/notification-service'
import { CreateCandidateJobFeedbackArguments } from 'shared/schema/database/candidate_job_feedback'
import { isLeft, unwrapEither } from 'shared/utils/handleEither'

function useCreateFeedBack() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { createCandidateJobFeedback, queryKey } = useGraphql()

  const useCreateReturn = useMutation({
    mutationKey: [queryKey],
    mutationFn: (payload: CreateCandidateJobFeedbackArguments) => {
      return GraphQLClientService.fetchGraphQL(
        createCandidateJobFeedback.query,
        payload
      )
    },
    onSuccess: (data) => {
      if (isLeft(data)) {
        return handleFailed({
          title: NotificationService.generateMessageFailed('CREATE'),
          content: t(unwrapEither(data).message) as string,
        })
      }
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
    onError(error) {
      return handleFailed({
        title: NotificationService.generateMessageFailed('CREATE'),
        content: t(error.message) as string,
      })
    },
  })

  const { mutateAsync, isPending } = useCreateReturn

  return {
    mutateCreateFeedback: mutateAsync,
    isCreateFeedback: isPending,
  }
}

export default useCreateFeedBack
