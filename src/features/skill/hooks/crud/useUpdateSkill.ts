import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/skill/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import Skill, { UpdateSkillArguments } from 'shared/schema/database/skill'

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
    UpdateSkillArguments
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
  const isValid = !formState.isValid || !formState.isDirty
  const { isPending, mutate } = useEditReturn

  function onSubmit(note:string) {
    handleSubmit((value) => {
      const payload: UpdateSkillArguments = {
        id,
        input: {
          description: value?.description ?? '',
          name: value?.name,
          skill_type_id:value?.skill_type_id,
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
    formState,
  }
}

export default useUpdateSkill
