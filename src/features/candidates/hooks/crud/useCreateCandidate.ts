import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { removeStatusAttachment, updateRecordSkill } from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'
import {
  CandidateReferenceType,
  CreateCandidateArguments,
} from 'shared/schema/database/candidate'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateCandidate(props: createCandidateProps) {
  const { callbackSuccess } = props

  const { createCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidate,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
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
    getValues,
  } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const entity_skill = updateRecordSkill(value.entity_skill_records)
      let attachments = removeStatusAttachment(value?.attachments)

      const payload: CreateCandidateArguments = {
        input: {
          dob: value.dob ? convertToEndDateUTC(value.dob) : null,
          recruit_time: value.recruit_time
            ? convertToEndDateUTC(value.recruit_time)
            : value.recruit_time,
          attachments: attachments,
          entity_skill_records: entity_skill,
          country: value?.country ?? '',
          description: value.description ?? '',
          email: value.email ?? '',
          phone: value.phone ?? '',
          reference_type: value?.reference_type as CandidateReferenceType,
          reference_uid: value.reference_uid ?? '',
          reference_value: value.reference_value ?? '',
          name: value.name ?? '',
        },
        note: '',
      }
      mutate(payload)
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
