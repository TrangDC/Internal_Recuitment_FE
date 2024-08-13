import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'
import { CreateCandidateJobArguments, LevelCandidateJob } from 'shared/schema/database/candidate_job'

interface useApplyToJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useApplyToJob(props: useApplyToJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { createCandidateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateJobArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJob,
    defaultValues: {
      attachments: [],
      offer_expiration_date: null,
      onboard_date: null,
      level: null,
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const {
    handleSubmit,
    control,
    formState,
    resetField,
    watch,
    getValues,
    trigger,
  } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const attachments = removeStatusAttachment(value?.attachments)
      const offer_expiration_date = value.offer_expiration_date
        ? convertToEndDateUTC(value.offer_expiration_date)
        : value.offer_expiration_date
      const onboard_date = value.onboard_date
        ? convertToEndDateUTC(value.onboard_date)
        : value.onboard_date

      const payload: CreateCandidateJobArguments = {
        input: {
          attachments: attachments,
          offer_expiration_date: offer_expiration_date ?? null,
          onboard_date: onboard_date ?? null,
          candidate_id: value?.candidate_id,
          failed_reason: [],
          hiring_job_id: value?.hiring_job_id,
          status: value?.status,
          level: value?.level as LevelCandidateJob | null
        },
        note: '',
      }

      mutate(payload)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    resetField,
    watch,
    getValues,
    trigger,
  }
}

export default useApplyToJob
