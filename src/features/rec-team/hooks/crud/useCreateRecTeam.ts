import { yupResolver } from '@hookform/resolvers/yup'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import useGraphql from 'features/rec-team/domain/graphql/graphql'
import {
  FormDataSchema,
  schema,
} from 'features/rec-team/shared/constants/schema'
import { useState } from 'react'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateRecTeamArguments } from 'shared/schema/database/rec_team'

interface createRecTeamProps {
  callbackSuccess?: (value: any) => void
}

function useCreateRecTeam(props: createRecTeamProps = {}) {
  const { callbackSuccess } = props
  const [recId, setRecId] = useState<string>('')
  const { handleWarning, handleReset } = usePopup()

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

  function onSubmitRecTeam() {
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

  function onSubmit() {
    if (!recId) {
      onSubmitRecTeam()
      return
    }

    handleWarning({
      title: 'Warning',
      content: `The selected leader is currently in a different REC team. This change will also move the user to this team. Proceeding?`,
      onSubmit: () => {
        onSubmitRecTeam()
        handleReset()
      },
    })
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    setRecId,
  }
}

export default useCreateRecTeam
