import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import {
  Candidate,
  UpdateCandidateInput,
} from 'features/candidates/domain/interfaces'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseEditCandidateProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateCandidate(props: UseEditCandidateProps) {
  const { id, onSuccess } = props
  const { updateCandidate, getCandidate, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Candidate,
    FormDataSchemaUpdate,
    UpdateCandidateInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateCandidate,
    oneBuildQuery: getCandidate,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        email: data.email,
        name: data.name,
        phone: data.phone,
        dob: data.dob ? new Date(data.dob) : data.dob,
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as UpdateCandidateInput)
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return {
    actions: {
      onSubmit,
      callbackSubmit,
    },
    control,
    isValid,
    isPending,
    setValue,
    isGetting,
  }
}

export default useUpdateCandidate
