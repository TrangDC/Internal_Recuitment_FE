import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateCandidateJobFeedbackArguments } from 'shared/schema/database/candidate_job_feedback'

interface createFeedbackProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateFeedback(props: createFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateJobFeedbackArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJobFeedback,
    defaultValues: {
      feedback: '',
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, watch, getValues } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const attachments = removeStatusAttachment(value?.attachments)
      const payload: CreateCandidateJobFeedbackArguments = {
        input: {
          attachments,
          candidate_job_id: value?.candidate_job_id,
          feedback: value?.feedback ?? '',
        },
        note: '',
      }
      mutate(payload)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    getValues,
  }
}

export default useCreateFeedback
