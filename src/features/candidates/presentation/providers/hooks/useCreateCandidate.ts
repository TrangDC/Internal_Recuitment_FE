import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schema, FormDataSchema } from '../constants/schema'
import { NewCandidateInput } from 'features/candidates/domain/interfaces'
import useCreateResource from 'shared/hooks/useCreateResource'
import { convertDateToISOString } from 'shared/utils/utils'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateCandidate(props: createCandidateProps) {
  const { callbackSuccess } = props

  const { createCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidate,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      note: '',
      dob: null,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate({
        ...value,
        dob: value.dob ? convertDateToISOString(value.dob) : value.dob,
      })
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}

export default useCreateCandidate
