import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import useCreateResource from 'shared/hooks/useCreateResource'
import { transformListArray, transformListItem } from 'shared/utils/utils'
import { isEmpty } from 'lodash'

interface createFeedbackProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateFeedback(props: createFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobFeedbackInput,
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

  const { handleSubmit, control, formState, watch } = useFormReturn
  const isValid = !formState.isValid
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
    watch
  }
}

export default useCreateFeedback
