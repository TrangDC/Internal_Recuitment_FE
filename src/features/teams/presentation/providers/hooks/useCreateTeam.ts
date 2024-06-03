import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { NewTeamInput } from 'features/teams/domain/interfaces'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { useCreateResource } from 'shared/hooks/crud-hook'

interface createTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateTeam(props: createTeamProps = {}) {
  const { callbackSuccess } = props

  const { createTeam, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewTeamInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createTeam,
    defaultValues: {
      name: '',
      members: [],
      note: ''
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess
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

export default useCreateTeam
