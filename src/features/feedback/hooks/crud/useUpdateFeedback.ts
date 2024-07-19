import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import {
  FeedBack,
  UpdateCandidateJobFeedbackInput,
} from 'features/feedback/domain/interfaces'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { removeStatusAttachment } from 'shared/utils/utils'

type UseEditFeedbackProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateFeedback(props: UseEditFeedbackProps) {
  const { id, onSuccess } = props
  const { updateCandidateJobFeedback, getFeedback, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    FeedBack,
    FormDataSchemaUpdate,
    UpdateCandidateJobFeedbackInput
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

  const { handleSubmit, control, formState, setValue, watch, getValues } = useFormReturn
  const isValid = !formState.isValid
  console.log("🚀 ~ useUpdateFeedback ~ isValid:", isValid)
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      const attachments = removeStatusAttachment(value?.attachments)

      mutate({
        ...value,
        attachments: attachments,
      } as UpdateCandidateJobFeedbackInput)
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      callbackSubmit,
    },
    formState,
    setValue,
    isGetting,
    watch,
    getValues
  }
}

export default useUpdateFeedback
