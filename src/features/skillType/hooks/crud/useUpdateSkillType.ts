import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skillType/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import SkillType, {
  UpdateSkillTypeArguments,
} from 'shared/schema/database/skill_type'

type UseEditSillTypeProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateSkillType(props: UseEditSillTypeProps) {
  const { id, onSuccess } = props
  const { updateSkillType, getSkillType, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    SkillType,
    FormDataSchemaUpdate,
    UpdateSkillTypeArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateSkillType,
    oneBuildQuery: getSkillType,
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
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const payload: UpdateSkillTypeArguments = {
        id,
        input: {
          description: value?.description ?? '',
          name: value?.name,
        },
        note: note,
      }
      mutate(payload)
    })()
  }

  return {
    actions: {
      onSubmit,
    },
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
  }
}

export default useUpdateSkillType
