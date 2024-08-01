import { yupResolver } from '@hookform/resolvers/yup'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import useGraphql from 'features/rec-team/domain/graphql/graphql'
import RecTeam, {
  UpdateRecTeamArguments,
} from 'shared/schema/database/rec_team'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from 'features/rec-team/shared/constants/schema'

type UseEditRecTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateRecTeam(props: UseEditRecTeamProps) {
  const { id, onSuccess } = props
  const { updateTeam, getRecTeamDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    RecTeam,
    FormDataSchemaUpdate,
    UpdateRecTeamArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateTeam,
    oneBuildQuery: getRecTeamDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      //const leader_id = data?.leader_id
      const leader_id = data?.leader_id ?? ''
      return {
        name: data?.name ?? '',
        leader_id: leader_id,
        description: data?.description ?? '',
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue, watch } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value: FormDataSchemaUpdate) => {
      mutate({
        id,
        input: {
          leader_id: value.leader_id,
          name: value.name,
          description: value.description || '',
        },
        note: note,
      })
    })()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
    },
    formState,
    setValue,
    isGetting,
    onSubmit,
  }
}

export default useUpdateRecTeam
