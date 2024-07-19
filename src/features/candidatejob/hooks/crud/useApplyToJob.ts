import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import {
  removeInfoData,
  removeStatusAttachment,
} from 'shared/utils/utils'
import _, { cloneDeep } from 'lodash'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { NewCandidateJobInput } from 'features/candidatejob/domain/interfaces'
import { convertToUTC } from 'shared/utils/date'

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
      attachments: [],
      failed_reason: [],
      offer_expiration_date: null,
      onboard_date: null,
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
      let deepValue = cloneDeep(value)
      const attachments = removeStatusAttachment(deepValue?.attachments)

      const offer_expiration_date = deepValue.offer_expiration_date
        ? convertToUTC(deepValue.offer_expiration_date)
        : deepValue.offer_expiration_date
      const onboard_date = deepValue.onboard_date
        ? convertToUTC(deepValue.onboard_date)
        : deepValue.onboard_date

      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ...deepValue,
          attachments: attachments,
          offer_expiration_date,
          onboard_date,
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
    getValues,
    trigger,
  }
}

export default useApplyToJob
