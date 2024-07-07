import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skill/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { Skill, SkillInputUpdate } from 'features/skill/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseEditCandidateProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateSkill(props: UseEditCandidateProps) {
  const { id, onSuccess } = props
  const { updateSkill, getSkillDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Skill,
    FormDataSchemaUpdate,
    SkillInputUpdate
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateSkill,
    oneBuildQuery: getSkillDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        name: data?.name ?? '',
        description: data?.description ?? '',
        skill_type_id: data?.skill_type?.id ?? '',
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
    formState,
  }
}

export default useUpdateSkill