import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from '../../domain/graphql/graphql'
import {
  schemaApplyJob,
  FormDataSchemaApplyJob,
} from '../../shared/constants/schema'
import { removeInfoData, removeStatusAttachment } from 'shared/utils/utils'
import _, { cloneDeep } from 'lodash'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CandidateJob,
  NewCandidateJobInput,
} from 'features/candidatejob/domain/interfaces'
import { convertToEndDateUTC } from 'shared/utils/date'

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
      offer_expiration_date: null,
      onboard_date: null,
      ...defaultValues,
    },
    resolver: yupResolver(schemaApplyJob),
    onSuccess: (data) => {
      const candidateJob: CandidateJob =
        data[createCandidateJob.operation]?.data
      callbackSuccess?.(candidateJob)
    },
  })

  const { handleSubmit, control, formState, resetField, watch, getValues, trigger } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      let deepValue = cloneDeep(value)
      const attachments = removeStatusAttachment(deepValue?.attachments)

      const offer_expiration_date = deepValue.offer_expiration_date
        ? convertToEndDateUTC(deepValue.offer_expiration_date)
        : deepValue.offer_expiration_date
      const onboard_date = deepValue.onboard_date
        ? convertToEndDateUTC(deepValue.onboard_date)
        : deepValue.onboard_date

      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ..._.cloneDeep(value),
          offer_expiration_date,
          onboard_date,
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
    getValues,
    trigger
  }
}

export default useApplyToJob
