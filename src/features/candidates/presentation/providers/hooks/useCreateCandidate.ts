import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schema, FormDataSchema } from '../constants/schema'
import { NewCandidateInput } from 'features/candidates/domain/interfaces'
import {
  convertDateToISOString,
  removeStatusAttachment,
  updateRecordSkill,
} from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'

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
      country: "Vietnam"
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, watch, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const entity_skill = updateRecordSkill(value.entity_skill_records);
      let attachments = removeStatusAttachment(value?.attachments)

      mutate({
        ...value,
        dob: value.dob ? convertDateToISOString(value.dob) : value.dob,
        recruit_time: value.recruit_time
          ? convertDateToISOString(value.recruit_time)
          : value.recruit_time,
        attachments: attachments,
        entity_skill_records: entity_skill,
      })
    })()
  }

  const resetSourceValue = () => {
    setValue('reference_value', '')
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    actions: {
      resetSourceValue,
    },
  }
}

export default useCreateCandidate
