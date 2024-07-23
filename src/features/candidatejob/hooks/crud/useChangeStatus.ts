import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../shared/constants/schema'
import { cloneDeep, isEmpty } from 'lodash'
import {
  getInfoData,
  removeInfoData,
  removeStatusAttachment,
} from 'shared/utils/utils'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import {
  FormDataSchema,
  FormDataSchemaUpdate,
  schema,
  schemaUpdate,
} from 'features/feedback/shared/constants/schema'
import { useState } from 'react'
import { useCreateResource, useEditResource } from 'shared/hooks/crud-hook'
import {
  CandidateJob,
  UpdateCandidateJobStatus,
  UpdateStatus,
} from 'features/candidatejob/domain/interfaces'
import { convertToEndDateUTC } from 'shared/utils/date'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
  id: string
}

interface propsChangeStatus {
  mutationFeedback: () => void
  callbackSuccess?: (value: any) => void
  id: string
}

function ChangeStatus(props: propsChangeStatus) {
  const { mutationFeedback, id } = props
  const { changeStatusCandidate, queryKey, getCandidateJob } = useGraphql()
  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateJob,
    Pick<FormDataSchemaUpdate, 'note'>,
    UpdateStatus
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: changeStatusCandidate,
    oneBuildQuery: getCandidateJob,
    queryKey: [queryKey],
    id,
    onSuccess: mutationFeedback,
    formatDefaultValues(data) {
      return {
        note: '',
      }
    },
  })

  const { formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  return {
    mutateChangeStatus: mutate,
    isPendingStatus: isPending,
    isValidStatus: isValid,
  }
}

function CreateFeedBackProp(
  props: Pick<useChangeStatusProps, 'callbackSuccess'> = {}
) {
  const { callbackSuccess } = props

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobFeedbackInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJobFeedback,
    defaultValues: {
      feedback: '',
    },
    show_modal: false,
    resolver: yupResolver(schema),
    onSuccess: (data) => {
      const response =
        data[createCandidateJobFeedback.operation]?.data?.candidate_job
      callbackSuccess?.(response)
    },
  })

  const { formState } = useFormReturn
  const isValid = !formState.isValid
  const { mutate } = useCreateReturn

  return {
    mutateCreateFeedback: mutate,
    isValidFeedback: isValid,
  }
}

function useChangeStatus(props: useChangeStatusProps) {
  const [data, setData] = useState<UpdateCandidateJobStatus>()

  const { defaultValues, callbackSuccess, id } = props
  const { mutateCreateFeedback } = CreateFeedBackProp({ callbackSuccess })

  const { mutateChangeStatus, isPendingStatus } = ChangeStatus({
    id: id,
    callbackSuccess,
    mutationFeedback: () => {
      if(!data?.feedback && isEmpty(data?.attachments)) {
        callbackSuccess?.({ ...data, id })
        return;
      }

      mutateCreateFeedback({
        ...getInfoData({ field: ['feedback', 'attachments'], object: data as UpdateCandidateJobStatus}),
        candidate_job_id: id,
      })
    },
  })

  const { handleSubmit, formState, control, watch, trigger, setValue, clearErrors, getValues } =
    useForm<FormDataSchemaChangeStatus>({
      resolver: yupResolver(schemaChangeStatus),
      mode: 'onChange',
      defaultValues: {
        feedback: '',
        attachments: [],
        failed_reason: [],
        onboard_date: null,
        offer_expiration_date: null,
        note: '',
        ...defaultValues
      },
    })

  const isValid = !formState.isValid

  function onSubmit() {
    handleSubmit((value) => {
      let deepValue = cloneDeep(value);
      deepValue.attachments = removeStatusAttachment(deepValue?.attachments)

      const offer_expiration_date = deepValue.offer_expiration_date ? convertToEndDateUTC(deepValue.offer_expiration_date) : deepValue.offer_expiration_date;
      const onboard_date = deepValue.onboard_date ? convertToEndDateUTC(deepValue.onboard_date) : deepValue.onboard_date;
      
      //remove field team_id
      const value_clone = removeInfoData({field: ['team_id'], object: {...deepValue, offer_expiration_date, onboard_date}});
      const update_status = removeInfoData({field: ['feedback', 'attachments'],object: value_clone}) as UpdateStatus;

      setData(value_clone as UpdateCandidateJobStatus)
      mutateChangeStatus(update_status)
    })()
  }

  const resetOfferDate = () => {
    setValue('offer_expiration_date', null)
    setValue('onboard_date', null)
    clearErrors(['offer_expiration_date', 'onboard_date'])
  }

  return {
    control,
    isValid,
    isPending: isPendingStatus,
    watch,
    formState,
    trigger,
    actions: {
      resetOfferDate,
      onSubmit
    },
    getValues
  }
}

export default useChangeStatus
