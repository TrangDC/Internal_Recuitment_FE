import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skill/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateSkillArguments } from 'shared/schema/database/skill'

interface createSkillProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateSkill(props: createSkillProps) {
  const { callbackSuccess } = props

  const { createSkill, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateSkillArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createSkill,
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const payload: CreateSkillArguments = {
        input: {
          description: value?.description ?? '',
          name: value?.name,
          skill_type_id:value?.skill_type_id,
        },
        note: '',
      }
      mutate(payload)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
  }
}

export default useCreateSkill
