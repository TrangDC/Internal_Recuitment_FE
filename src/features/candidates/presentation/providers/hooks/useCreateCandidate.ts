import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { NewJobTitleInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema,FormDataSchema } from '../constants/schema'

function useCreateCandidate() {
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // name: '',
      // code: '',
      // description: '',
    },
  })

  const { createJobTitle, queryKey } = useGraphql()
  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTodo: NewJobTitleInput) =>
      fetchGraphQL<BaseRecord>(createJobTitle.query, {
        input: newTodo,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
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

export default useCreateCandidate
