import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { removeStatusAttachment } from 'shared/utils/utils'
import CandidateJobFeedback, {
  UpdateCandidateJobFeedbackArguments,
} from 'shared/schema/database/candidate_job_feedback'

type UseEditFeedbackProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateFeedback(props: UseEditFeedbackProps) {
  const { id, onSuccess } = props
  const { updateCandidateJobFeedback, getFeedback, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    CandidateJobFeedback,
    FormDataSchemaUpdate,
    UpdateCandidateJobFeedbackArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateCandidateJobFeedback,
    oneBuildQuery: getFeedback,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        note: '',
        feedback: data?.feedback,
        attachments: data?.attachments ?? [],
      }
    },
  })

  const { handleSubmit, control, formState, setValue, watch, getValues } =
    useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const attachments = removeStatusAttachment(value?.attachments)
      const payload: UpdateCandidateJobFeedbackArguments = {
        id,
        input: {
          attachments,
          feedback: value?.feedback ?? '',
        },
        note,
      }
      mutate(payload)
    })()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
    },
    formState,
    setValue,
    isGetting,
    watch,
    getValues,
  }
}

export default useUpdateFeedback
