import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { BlackListCandidateInput, Candidate } from 'features/candidates/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import {
  schemaBlackList,
  FormDataSchemaBlackList
} from '../../providers/constants/schema'
import { useUpdateResourceOther } from 'shared/hooks/crud-hook'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useChangeStatusJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props

  const { blackListCandidate, queryKey, getCandidate } = useGraphql()
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
      console.log("🚀 ~ formatDefaultValues ~ data:", data)
      return {
        note: '',
        is_black_list: !data?.is_black_list
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
    if(typeof formData?.is_black_list !== 'boolean') return '';
    return !formData?.is_black_list ? "Do you want to remove users from the blacklist?" : "Do you want to add users to the blacklist?"
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      renderTitle,
    }
  }
}

export default useChangeStatusJob

