import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import {
  schemaUpdate,
  FormDataSchemaUpdate,
} from '../../shared/constants/schema'
import { UpdateCandidateInput } from 'features/candidates/domain/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import {
  formatRecordSkill,
  removeStatusAttachment,
  updateRecordSkill,
} from 'shared/utils/utils'
import { convertToEndDateUTC } from 'shared/utils/date'
import Candidate from 'shared/schema/database/candidate'

type UseEditCandidateProps = {
  id: string
  onSuccess: (data: Candidate) => void
}

function useUpdateCandidate(props: UseEditCandidateProps) {
  const { id, onSuccess } = props
  const { updateCandidate, getCandidate, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Candidate,
    FormDataSchemaUpdate,
    UpdateCandidateInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateCandidate,
    oneBuildQuery: getCandidate,
    queryKey: [queryKey],
    id,
    onSuccess: (data) => {
      const candidate: Candidate = data[updateCandidate.operation]?.data
      onSuccess?.(candidate)
    },
    formatDefaultValues(data) {
      const entity_skill_records = formatRecordSkill(data?.entity_skill_types)
      return {
        email: data?.email ?? '',
        name: data?.name ?? '',
        phone: data?.phone ?? '',
        dob: data?.dob ? new Date(data?.dob) : null,
        note: '',
        country: data?.country ?? '',
        reference_type: data?.reference_type ?? '',
        reference_value: data?.reference_value ?? '',
        description: data?.description ?? '',
        recruit_time: data?.recruit_time
          ? new Date(data?.recruit_time)
          : new Date(),
        reference_uid: data?.reference_uid ?? '',
        attachments: data?.attachments ?? [],
        entity_skill_records: entity_skill_records,
      }
    },
  })

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    watch,
    clearErrors,
    getValues,
  } = useFormReturn
  const isValid = !formState.isValid || !formState.isDirty
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      let attachments = removeStatusAttachment(value?.attachments)
      const entity_skill = updateRecordSkill(value.entity_skill_records)

      mutate({
        ...value,
        //@ts-ignore
        dob: value.dob ? convertToEndDateUTC(value.dob) : value.dob,
        recruit_time: value.recruit_time
          ? convertToEndDateUTC(value.recruit_time)
          : value.recruit_time,
        attachments: attachments,
        entity_skill_records: entity_skill,
      })
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  const resetSourceValue = () => {
    setValue('reference_value', '')
    clearErrors('reference_value')
  }

  return {
    actions: {
      onSubmit,
      callbackSubmit,
      resetSourceValue,
    },
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
    formState,
    watch,
    getValues,
  }
}

export default useUpdateCandidate
