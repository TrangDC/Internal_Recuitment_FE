import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import {
  Team,
  UpdateTeamInput,
} from 'features/teams/domain/interfaces'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from '../../providers/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { transformListItem } from 'shared/utils/utils'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateTeam(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { updateTeam, getTeamDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Team,
    FormDataSchemaUpdate,
    UpdateTeamInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateTeam,
    oneBuildQuery: getTeamDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const members = transformListItem(data?.members);
 
      return {
        name: data.name,
        members: members,
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value)
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
    isGetting
  }
}

export default useUpdateTeam
