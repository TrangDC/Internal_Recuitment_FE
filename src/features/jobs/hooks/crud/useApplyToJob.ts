import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from '../../domain/graphql/graphql'
import {
  schemaApplyJob,
  FormDataSchemaApplyJob,
} from '../../shared/constants/schema'
import { removeInfoData, removeStatusAttachment } from 'shared/utils/utils'
import _ from 'lodash'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CandidateJob,
  NewCandidateJobInput,
} from 'features/candidatejob/domain/interfaces'

interface useApplyToJobProps {
  defaultValues?: Partial<FormDataSchemaApplyJob>
  callbackSuccess?: (value: CandidateJob) => void
}

function useApplyToJob(props: useApplyToJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { createCandidateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobInput,
    FormDataSchemaApplyJob
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJob,
    defaultValues: {
      note: '',
      ...defaultValues,
    },
    resolver: yupResolver(schemaApplyJob),
    onSuccess: (data) => {
      const candidateJob: CandidateJob =
        data[createCandidateJob.operation]?.data
      callbackSuccess?.(candidateJob)
    },
  })

  const { handleSubmit, control, formState, resetField, watch, getValues } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      let attachments = removeStatusAttachment(value?.attachments)

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
    resetField,
    watch,
    getValues
  }
}

export default useApplyToJob
