import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { schema, FormDataSchema } from '../constants/schema'
import { NewCandidateJobInput } from 'features/candidates/domain/interfaces'
import { getValueOfObj, removeInfoData } from 'shared/utils/utils'
import useCreateResource from 'shared/hooks/useCreateResource'
import _ from 'lodash'

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
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ..._.cloneDeep(value),
          hiring_job_id: getValueOfObj({ obj: value.hiring_job_id, key: 'id' }),
          status: getValueOfObj({ obj: value.status, key: 'value' }),
        },
      })
console.log("valueClone", valueClone)
      mutate(valueClone as NewCandidateJobInput)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}

export default useApplyToJob
