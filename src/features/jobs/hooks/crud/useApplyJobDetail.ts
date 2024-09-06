import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'
import CandidateJob, {
  CreateCandidateJobArguments,
  LevelCandidateJob,
} from 'shared/schema/database/candidate_job'
import {
  FormDataSchemaApplyJob,
  schemaApplyJob,
} from 'features/application/shared/constants/schema'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'

interface useApplyToJobProps {
  defaultValues?: Partial<FormDataSchemaApplyJob>
  callbackSuccess?: (value: any) => void
}

function useApplyToJobDetail(
  props: useApplyToJobProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props
const {user} = useAuthorization();
  const { createCandidateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateJobArguments,
    FormDataSchemaApplyJob
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJob,
    defaultValues: {
      attachments: [],
      offer_expiration_date: null,
      onboard_date: null,
      level: null,
      rec_in_charge_id: user?.id,
      ...defaultValues,
    },
    resolver: yupResolver(schemaApplyJob),
    onSuccess: (data) => {
      const candidateJob: CandidateJob =
        data[createCandidateJob.operation]?.data
      callbackSuccess?.(candidateJob)
    },
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
          level: value?.level as LevelCandidateJob | null,
          rec_in_charge_id: value?.rec_in_charge_id,
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

export default useApplyToJobDetail
