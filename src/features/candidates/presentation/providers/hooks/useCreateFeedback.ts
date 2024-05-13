import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { NewTeamInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schemaFeedback, FormDataSchemaFeedback} from '../constants/schema'

function useCreateFeedback() {
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm({
    resolver: yupResolver(schemaFeedback),
    defaultValues: {
      // name: '',
      // code: '',
      // description: '',
    },
  })

  const { createJob, queryKey } = useGraphql()
  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTodo: NewTeamInput) =>
      fetchGraphQL<BaseRecord>(createJob.query, {
        input: newTodo,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaFeedback) => {
    console.log("🚀 ~ handleSubmit ~ value:", value)

      // mutate(value)
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