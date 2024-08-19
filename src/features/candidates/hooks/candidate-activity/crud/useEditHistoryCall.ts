import { yupResolver } from '@hookform/resolvers/yup'
import { removeStatusAttachment } from 'shared/utils/utils'
import {
  EditHistoryCallSchema,
  FormDataSchemaEditHistoryCall,
} from 'features/candidates/shared/constants/historyCallSchema'
import dayjs from 'dayjs'
import {
  CandidateHistoryCall,
  CandidateHistoryCallTypeEnum,
  UpdateCandidateHistoryCallArguments,
} from 'shared/schema/database/candidate_history_calls'
import useEditResource from 'shared/hooks/crud-hook/useUpdateResourceOther'
import useCandidateHistoryCallGraphql from 'features/candidates/domain/graphql/candidateHistoryCall'

type UseCreateNoteProps = {
  successCallback: () => void
  id: string
}

function useEditHistoryCall({ successCallback, id }: UseCreateNoteProps) {
  const { getCandidateHistoryCall, updateCandidateHistoryCall, queryKey } =
    useCandidateHistoryCallGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    CandidateHistoryCall,
    FormDataSchemaEditHistoryCall,
    UpdateCandidateHistoryCallArguments
  >({
    id: id,
    editBuildQuery: updateCandidateHistoryCall,
    oneBuildQuery: getCandidateHistoryCall,
    queryKey: [queryKey],
    formatDefaultValues: (data) => {
      return {
        name: data?.name ?? '',
        attachments: data?.attachments || [],
        description: data?.description ?? '',
        contactDate: data?.date ? dayjs(data?.date) : null,
        timeFrom: data?.start_time ? dayjs(data?.start_time) : null,
        contactTo: data?.contact_to ?? '',
        contactType: data?.type ?? '',
        timeTo: data?.end_time ? dayjs(data?.end_time) : null,
      }
    },
    resolver: yupResolver(EditHistoryCallSchema),
    onSuccess(data) {
      successCallback()
    },
  })

  const { handleSubmit, control, formState, watch, getValues, setValue } =
    useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      if (id && value?.contactDate) {
        const attachments = removeStatusAttachment(value?.attachments)
        const payload: UpdateCandidateHistoryCallArguments = {
          id: id,
          input: {
            contact_to: value.contactTo ?? '',
            date: value?.contactDate?.toISOString(),
            description: value.description ?? '',
            end_time: value.timeTo?.toISOString() ?? null,
            name: value.name,
            start_time: value.timeFrom?.toISOString() ?? null,
            type: value.contactType as CandidateHistoryCallTypeEnum,
            attachments: attachments,
          },
          note: note,
        }
        mutate(payload)
      }
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    getValues,
    useEditReturn,
    useFormReturn,
    setValue,
    isGetting,
  }
}

export default useEditHistoryCall
