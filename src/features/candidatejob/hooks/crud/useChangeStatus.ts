import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../shared/constants/schema'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useEditResource } from 'shared/hooks/crud-hook'
import { convertToEndDateUTC } from 'shared/utils/date'
import CandidateJob, {
  LevelCandidateJob,
  UpdateCandidateJobStatusArguments,
} from 'shared/schema/database/candidate_job'
import useCreateFeedBack from './useCreateFeedback'
import { isRight } from 'shared/utils/handleEither'
import { isEmpty } from 'lodash'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
  id: string
}

function useChangeStatus(props: useChangeStatusProps) {
  const { callbackSuccess, id, defaultValues } = props
  const { changeStatusCandidate, queryKey, getCandidateJob } = useGraphql()
  const { mutateCreateFeedback, isCreateFeedback } = useCreateFeedBack()

  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateJob,
    FormDataSchemaChangeStatus,
    UpdateCandidateJobStatusArguments
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: changeStatusCandidate,
    oneBuildQuery: getCandidateJob,
    queryKey: [queryKey],
    id,
    formatDefaultValues(data) {
      return {
        status: data?.status ?? '',
        attachments: [],
        failed_reason: [],
        feedback: '',
        offer_expiration_date: null,
        onboard_date: null,
        level: null,
        ...defaultValues,
      }
    },
  })

  const {
    handleSubmit,
    formState,
    control,
    watch,
    trigger,
    setValue,
    clearErrors,
    getValues,
  } = useFormReturn
  const { mutateAsync, isPending } = useEditReturn
  const isValid = !formState.isValid

  function onSubmit() {
    handleSubmit((value) => {
      const createFeedback = !!(value.feedback || !isEmpty(value.attachments));
      const attachments = removeStatusAttachment(value?.attachments)
      const offer_expiration_date = value.offer_expiration_date
        ? convertToEndDateUTC(value.offer_expiration_date)
        : value.offer_expiration_date
      const onboard_date = value.onboard_date
        ? convertToEndDateUTC(value.onboard_date)
        : value.onboard_date

      const payload: UpdateCandidateJobStatusArguments = {
        id,
        input: {
          failed_reason: value?.failed_reason ?? [],
          offer_expiration_date: offer_expiration_date ?? null,
          onboard_date: onboard_date ?? null,
          status: value?.status,
          level: value?.level as LevelCandidateJob | null
        },
        note: '',
      }
 
      mutateAsync(payload).then((data) => {
        if (isRight(data) && createFeedback) {
          mutateCreateFeedback({
            input: {
              attachments,
              candidate_job_id: id,
              feedback: value?.feedback ?? '',
            },
            note: '',
          }).then(() => callbackSuccess?.({id: id, status: value?.status}))
        } else {
          callbackSuccess?.({id: id, status: value?.status})
        }
      })
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
    isPending: isCreateFeedback || isPending,
    watch,
    formState,
    trigger,
    actions: {
      resetOfferDate,
      onSubmit,
    },
    getValues,
  }
}

export default useChangeStatus
