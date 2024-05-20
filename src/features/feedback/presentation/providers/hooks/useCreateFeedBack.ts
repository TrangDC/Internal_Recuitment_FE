import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema} from '../constants/schema'
import { cloneDeep } from 'lodash'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createFeedbackProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateFeedback(props: createFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props;

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newFeedback: NewCandidateJobFeedbackInput) =>
      fetchGraphQL<BaseRecord>(createCandidateJobFeedback.query, {
        input: newFeedback,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('create feedback success')
      callbackSuccess &&  callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = cloneDeep(value);

      mutate(valueClone as NewCandidateJobFeedbackInput)
    })()
  }
  
  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useCreateFeedback