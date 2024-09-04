import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { Attachments, BaseRecord } from 'shared/interfaces'
import {
  FormDataSchemaUpdateJobAttachments,
  schemaUpdateJobAttachment,
} from '../../shared/constants/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'
import CandidateJob, {
  UpdateCandidateJobAttachmentArguments,
} from 'shared/schema/database/candidate_job'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseEditJobApplicationProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditJobApplication(props: UseEditJobApplicationProps) {
  const { id, onSuccess } = props
  const { updateCandidateJobAttachment, queryKey, getCandidateJob } =
    useGraphql()

  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateJob,
    FormDataSchemaUpdateJobAttachments,
    UpdateCandidateJobAttachmentArguments
  >({
    resolver: yupResolver(schemaUpdateJobAttachment),
    editBuildQuery: updateCandidateJobAttachment,
    queryKey: [queryKey],
    onSuccess,
    id: id,
    oneBuildQuery: getCandidateJob,
    formatDefaultValues(data) {
      return {
        attachments: [],
        rec_in_charge_id: data?.rec_in_charge?.id ?? '',
        rec_team: data?.rec_team?.id ?? '',
      }
    },
  })

  const { handleSubmit, watch, control, formState, getValues, resetField } =
    useFormReturn
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const attachments: Attachments[] = removeStatusAttachment(
        value?.attachments
      ) as Attachments[]
      const payload: UpdateCandidateJobAttachmentArguments = {
        id,
        input: {
          attachments,
          rec_in_charge_id: value?.rec_in_charge_id,
        },
        note: note,
      }
      mutate(payload)
    })()
  }

  const attachments = watch('attachments')
  const isValidAttachments = useMemo(() => {
    if (!Array.isArray(attachments) || isEmpty(attachments)) return false
    return attachments.every((file) => file.status === 'success')
  }, [attachments])

  return {
    isValid: !isValidAttachments,
    onSubmit,
    isPending,
    useFormReturn,
    control,
    formState,
    getValues,
    watch,
    resetField,
  }
}

export default useEditJobApplication
