import useGraphql from 'features/calendars/domain/graphql'
import useCreateResource from 'shared/hooks/useCreateResource'
import {
  CreateInterviewFrom,
  CreateInterviewSchema,
} from '../constants/validate'
import { NewIntefviewInput } from 'features/calendars/domain/graphql/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'

function useCreateInterview() {
  const { createNews, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewIntefviewInput,
    CreateInterviewFrom
  >({
    mutationKey: [queryKey],
    queryString: createNews,
    defaultValues: {
      title: '',
      description: '',
      candidateId: '',
      candidateMail: '',
      interviewer: [],
      jobId: '',
      teamId: '',
    },
    resolver: yupResolver(CreateInterviewSchema),
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isDirty || !formState.isValid
  const { isPending } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      // mutate(value)
    })()
  }
  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}
export default useCreateInterview
