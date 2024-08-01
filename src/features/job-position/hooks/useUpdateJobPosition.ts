import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/job-position/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { FormDataSchemaUpdate, schemaUpdate } from '../shared/constants/schema'
import JobPosition, {
  UpdateJobPositionArguments,
} from 'shared/schema/database/job_position'

type UseEditTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateJobPosition(props: UseEditTeamProps) {
  const { id, onSuccess } = props
  const { updateJobPosition, getJobPosition, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    JobPosition,
    FormDataSchemaUpdate,
    UpdateJobPositionArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateJobPosition,
    oneBuildQuery: getJobPosition,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        name: data?.name ?? '',
        description: data?.description ?? '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      mutate({
        id,
        input: value,
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
  }
}

export default useUpdateJobPosition
