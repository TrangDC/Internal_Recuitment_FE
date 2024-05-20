import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { NewCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { cloneDeep } from 'lodash'
import { convertDateToISOString, transformListItem } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createInterviewProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateInterview(props: createInterviewProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props;
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createCandidateInterview, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newInterview: NewCandidateInterviewInput) => {
      return fetchGraphQL<BaseRecord>(createCandidateInterview.query, {
        input: newInterview,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Create interview success')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = {
        ...cloneDeep(value),
        interview_date: convertDateToISOString(value.interview_date.toString()),
        start_from: convertDateToISOString(value.start_from.toString()),
        end_at: convertDateToISOString(value.end_at.toString()),
        interviewer: transformListItem(value.interviewer, 'id')
      };

      mutate(valueClone as NewCandidateInterviewInput)
    })()
  }
  
  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useCreateInterview