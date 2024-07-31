import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/teams/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { transformListItem } from 'shared/utils/utils'
import { useEditResource } from 'shared/hooks/crud-hook'
import HiringTeam, { UpdateHiringTeamArguments } from 'shared/schema/database/hiring_team'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from 'features/teams/shared/constants/schema'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateTeam(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { updateTeam, getTeamDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    HiringTeam,
    FormDataSchemaUpdate,
    UpdateHiringTeamArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateTeam,
    oneBuildQuery: getTeamDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const members = transformListItem(data?.managers ?? [])
      return {
        name: data?.name ?? '',
        members: members,
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn

  function onSubmit(note:string) {
    handleSubmit((value) => {
      const payload: UpdateHiringTeamArguments = {
        id,
        input: {
          members: value?.members ?? [],
          name: value?.name,
        },
        note: note,
      }
      mutate(payload)
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
  }
}

export default useUpdateTeam
