import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { NewCandidateInput } from 'features/candidates/domain/interfaces'
import {
  removeStatusAttachment,
  updateRecordSkill,
} from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateCandidate(props: createCandidateProps) {
  const { callbackSuccess } = props

  const { createCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidate,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      note: '',
      dob: null,
      reference_uid: '',
      description: '',
      entity_skill_records: {},
      country: 'Vietnam',
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const {
    handleSubmit,
    control,
    formState,
    watch,
    setValue,
    clearErrors,
    getValues
  } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const entity_skill = updateRecordSkill(value.entity_skill_records)
      let attachments = removeStatusAttachment(value?.attachments)

      mutate({
        ...value,
        dob: value.dob ? convertToEndDateUTC(value.dob) : value.dob,
        recruit_time: value.recruit_time
          ? convertToEndDateUTC(value.recruit_time)
          : value.recruit_time,
        attachments: attachments,
        entity_skill_records: entity_skill,
      })
    })()
  }

  const resetSourceValue = () => {
    setValue('reference_value', '')
    clearErrors('reference_value')
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    getValues,
    actions: {
      resetSourceValue,
    },
  }
}

export default useCreateCandidate
