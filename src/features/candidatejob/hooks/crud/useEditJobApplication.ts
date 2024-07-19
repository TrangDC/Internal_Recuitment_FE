import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { UpdateCandidateAttachment } from 'features/candidatejob/domain/interfaces'
import useEditResourceWithoutGetting from 'shared/hooks/crud-hook/useEditResourceWithoutGetting'
import { Attachments, BaseRecord } from 'shared/interfaces'
import {
  FormDataSchemaUpdateJobAttachments,
  schemaUpdateJobAttachment,
} from '../../shared/constants/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useMemo } from 'react'
import { isEmpty } from 'lodash'

type UseEditJobApplicationProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditJobApplication(props: UseEditJobApplicationProps) {
  const { id, onSuccess } = props
  const { updateCandidateJobAttachment, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn } = useEditResourceWithoutGetting<
    FormDataSchemaUpdateJobAttachments,
    UpdateCandidateAttachment
  >({
    resolver: yupResolver(schemaUpdateJobAttachment),
    editBuildQuery: updateCandidateJobAttachment,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues: {
      attachments: [],
    },
  })

  const { handleSubmit, watch, control, formState, getValues } = useFormReturn
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const attachments: Attachments[] = removeStatusAttachment(
        value?.attachments
      ) as Attachments[]
      mutate({
        ...value,
        attachments: attachments,
        note: note,
      })
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
    getValues
  }
}

export default useEditJobApplication
