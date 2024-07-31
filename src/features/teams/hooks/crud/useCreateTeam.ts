import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { FormDataSchema, schema } from 'features/teams/shared/constants/schema'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateHiringTeamArguments } from 'shared/schema/database/hiring_team'

interface createTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateTeam(props: createTeamProps = {}) {
  const { callbackSuccess } = props

  const { createTeam, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateHiringTeamArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createTeam,
    defaultValues: {
      name: '',
      members: [],
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const payload: CreateHiringTeamArguments = {
        input: {
          members: value?.members ?? [],
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
    formState,
  }
}

export default useCreateTeam
