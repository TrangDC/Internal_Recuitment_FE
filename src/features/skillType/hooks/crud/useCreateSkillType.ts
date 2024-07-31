import { yupResolver } from '@hookform/resolvers/yup'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { useCreateResource } from 'shared/hooks/crud-hook'
import useGraphql from 'features/skillType/domain/graphql/graphql'
import { CreateSkillTypeArguments } from 'shared/schema/database/skill_type'

interface createSkillProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateSkillType(props: createSkillProps) {
  const { callbackSuccess } = props

  const { createSkillType, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateSkillTypeArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createSkillType,
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
      const payload: CreateSkillTypeArguments = {
        input: {
          description: value?.description ?? '',
          name: value?.name,
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
  }
}

export default useCreateSkillType
