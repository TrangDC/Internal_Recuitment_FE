import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { UpdateTypeInput } from 'features/teams/domain/interfaces'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from '../../providers/constants/schema'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface updateTeamProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateTeam(props: updateTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { updateTeam, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
    UpdateTypeInput,
    FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateTeam,
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schemaUpdate),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
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
    setValue,
  }
}

export default useUpdateTeam
