import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { NewJobTitleInput } from 'features/teams/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
function useCreateTeam() {
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm({
    defaultValues: {
      name: '',
      code: '',
      description: '',
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
    handleSubmit((value) => mutate(value))()
  }
  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useCreateTeam
