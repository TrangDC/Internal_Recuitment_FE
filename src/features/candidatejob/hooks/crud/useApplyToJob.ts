import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { removeInfoData, transformListArray } from 'shared/utils/utils'
import _ from 'lodash'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { NewCandidateJobInput } from 'features/candidatejob/domain/interfaces'

interface useApplyToJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useApplyToJob(props: useApplyToJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { createCandidateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJob,
    defaultValues: {
      note: '',
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, resetField, watch } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      let attachments =
        value?.attachments && Array.isArray(value?.attachments)
          ? value.attachments
          : []

      attachments = transformListArray(attachments, [
        'document_id',
        'document_name',
      ])

      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ..._.cloneDeep(value),
          attachments: attachments,
        },
      })
      mutate(valueClone as NewCandidateJobInput)
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
  }
}

export default useApplyToJob
