import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/rec-team/domain/graphql/graphql'
import {
  FormDataSchema,
  schema,
} from 'features/rec-team/shared/constants/schema'

import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateRecTeamArguments } from 'shared/schema/database/rec_team'

interface createRecTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateRecTeam(props: createRecTeamProps = {}) {
  const { callbackSuccess } = props

  const { createRecTeam, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateRecTeamArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createRecTeam,
    defaultValues: {
      name: '',
      leader_id: '',
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
      mutate({
        input: {
          leader_id: value.leader_id,
          name: value.name,
          description: value.description || '',
        },
        note: '',
      })
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

export default useCreateRecTeam
