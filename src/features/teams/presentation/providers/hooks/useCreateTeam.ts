import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { NewJobTitleInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema,FormDataSchema } from '../../providers/constants/schema'

function useCreateTeam(defaultValues: Partial<FormDataSchema> = {}) {
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues
    },
  })

  const { createJobTitle, queryKey } = useGraphql()
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

export default useCreateTeam
