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
import { transformListArray } from 'shared/utils/utils'

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
        attachments: [],
      }
    },
  })

  const { handleSubmit, control, formState, setValue, watch } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      let attachments =
        value?.attachments && Array.isArray(value?.attachments)
          ? value.attachments
          : []

      attachments = transformListArray(attachments, [
        'document_id',
        'document_name',
      ])

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
  }
}

export default useUpdateFeedback
