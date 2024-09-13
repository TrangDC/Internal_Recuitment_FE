import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { Attachments, BaseRecord } from 'shared/interfaces'
import {
  FormDataSchemaUpdateJobs,
  schemaUpdateJob,
} from '../../shared/constants/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useMemo } from 'react'
import CandidateJob, {
  UpdateCandidateJobAttachmentArguments,
} from 'shared/schema/database/candidate_job'
import { useEditResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'

type UseEditJobApplicationProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditJobApplication(props: UseEditJobApplicationProps) {
  const { id, onSuccess } = props
  const { updateCandidateJob, queryKey, getCandidateJob } =
    useGraphql()

  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateJob,
    FormDataSchemaUpdateJobs,
    UpdateCandidateJobAttachmentArguments
  >({
    resolver: yupResolver(schemaUpdateJob),
    editBuildQuery: updateCandidateJob,
    queryKey: [queryKey],
    onSuccess,
    id: id,
    oneBuildQuery: getCandidateJob,
    formatDefaultValues(data) {
      return {
        attachments: [],
        rec_in_charge_id: data?.rec_in_charge?.id ?? '',
        status: data?.status,
        offer_expiration_date: data?.offer_expiration_date ? new Date(data?.offer_expiration_date) : null,
        onboard_date: data?.onboard_date ?  new Date(data?.onboard_date) : null,
      }
    },
  })

  const { handleSubmit, watch, control, formState, getValues, resetField, trigger } =
    useFormReturn
  const { isPending, mutate } = useEditReturn
  const isValid = !formState.isValid || !formState.isDirty

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const attachments: Attachments[] = removeStatusAttachment(
        value?.attachments
      ) as Attachments[]

      const offer_expiration_date = value.offer_expiration_date
      ? convertToEndDateUTC(value.offer_expiration_date)
      : null
    const onboard_date = value.onboard_date
      ? convertToEndDateUTC(value.onboard_date)
      : null

      const payload: UpdateCandidateJobAttachmentArguments = {
        id,
        input: {
          attachments,
          rec_in_charge_id: value?.rec_in_charge_id,
          offer_expiration_date: offer_expiration_date,
          onboard_date: onboard_date,
        },
        note: note,
      }
      mutate(payload)
    })()
  }

  const attachments = watch('attachments')
  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments)) return false
    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  return {
    isValid:  !isValidAttachments || isValid,
    onSubmit,
    isPending,
    useFormReturn,
    control,
    formState,
    getValues,
    watch,
    resetField,
    trigger
  }
}

export default useEditJobApplication
