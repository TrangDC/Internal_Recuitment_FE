import { yupResolver } from '@hookform/resolvers/yup'
// import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schema, FormDataSchema } from '../constants/schema'
import { SkillTypeInput } from 'features/skillType/domain/interfaces'
import { useCreateResource } from 'shared/hooks/crud-hook'
import useGraphql from 'features/skillType/domain/graphql/graphql'

interface createSkillProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateSkillType(props: createSkillProps) {
  const { callbackSuccess } = props

  const { createSkillType, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    SkillTypeInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createSkillType,
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

export default useCreateSkillType
