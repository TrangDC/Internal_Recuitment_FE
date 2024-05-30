import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { UpdateCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import useUpdateResource from 'shared/hooks/useUpdateResource'
import { transformListArray } from 'shared/utils/utils'

interface updateFeedbackProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateFeedback(props: updateFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { updateCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
    UpdateCandidateJobFeedbackInput,
    FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateCandidateJobFeedback,
    defaultValues: {
      feedback: '',
      ...defaultValues,
    },
    resolver: yupResolver(schemaUpdate),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue, watch } = useFormReturn
  const isValid = !formState.isDirty || !formState.isValid
  const { isPending, mutate } = useCreateReturn

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
        attachments,
      })
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    setValue,
    watch,
  }
}

export default useUpdateFeedback
