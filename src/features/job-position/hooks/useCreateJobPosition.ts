import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/job-position/domain/graphql/graphql'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { FormDataSchema, schema } from '../shared/constants/schema'
import { CreateJobPositionArguments } from 'shared/schema/database/job_position'

interface createJobPositionProps {
  callbackSuccess?: (value: any) => void
}

function useCreateJobPosition(props: createJobPositionProps = {}) {
  const { callbackSuccess } = props

  const { createJobPosition, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateJobPositionArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createJobPosition,
    defaultValues: {
      name: '',
      description: '',
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
        input: value,
        note: '',
      })
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
  }
}

export default useCreateJobPosition
