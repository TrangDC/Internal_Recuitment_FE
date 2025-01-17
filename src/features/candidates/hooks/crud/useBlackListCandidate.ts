import { yupResolver } from '@hookform/resolvers/yup'
import { BlackListCandidateInput } from 'features/candidates/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import {
  schemaBlackList,
  FormDataSchemaBlackList,
} from '../../shared/constants/schema'
import { useUpdateResourceOther } from 'shared/hooks/crud-hook'
import Candidate from 'shared/schema/database/candidate'
import useCandidateGraphql from 'features/candidates/domain/graphql/candidate'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useChangeStatusJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props

  const { blackListCandidate, queryKey, getCandidate } = useCandidateGraphql()
  const { useEditReturn, useFormReturn, formData } = useUpdateResourceOther<
    Candidate,
    FormDataSchemaBlackList,
    BlackListCandidateInput
  >({
    resolver: yupResolver(schemaBlackList),
    editBuildQuery: blackListCandidate,
    oneBuildQuery: getCandidate,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        note: '',
        is_black_list: !data?.is_black_list,
      }
    },
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as BlackListCandidateInput)
    })()
  }

  function renderTitle() {
    if (typeof formData?.is_black_list !== 'boolean') return ''
    return !formData?.is_black_list
      ? 'Do you want to remove users from the blacklist?'
      : 'Do you want to add users to the blacklist?'
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      renderTitle,
    },
  }
}

export default useChangeStatusJob
