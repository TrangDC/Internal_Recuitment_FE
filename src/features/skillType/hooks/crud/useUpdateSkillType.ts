import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skillType/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import {
  SkillType,
  SkillTypeInputUpdate,
} from 'features/skillType/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { SkillInputUpdate } from 'features/skill/domain/interfaces'

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
    SkillTypeInputUpdate
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
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as SkillInputUpdate)
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return {
    actions: {
      onSubmit,
      callbackSubmit,
    },
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
  }
}

export default useUpdateSkillType
