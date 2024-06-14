import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skill/domain/graphql/graphql'
import { schema, FormDataSchema } from '../constants/schema'
import { SkillInput } from 'features/skill/domain/interfaces'
import { useCreateResource } from 'shared/hooks/crud-hook'

interface createSkillProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateSkill(props: createSkillProps) {
  const { callbackSuccess } = props

  const { createSkill, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    SkillInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createSkill,
    defaultValues: {
      name: '',
      description: '',
      note: '',
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}

export default useCreateSkill
