import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { FormDataSchemaUpdate, schemaUpdate } from '../../providers/constants/schema'
import {
  UpdateHiringJobInput,
} from 'features/jobs/domain/interfaces'
import _ from 'lodash'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface createJobProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateJob(props: createJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props
  const { updateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
  UpdateHiringJobInput,
  FormDataSchemaUpdate
>({
  mutationKey: [queryKey],
  queryString: updateJob,
  defaultValues: {
    name: '',
    salary_from: "0",
    salary_to: "0",
    note: '',
    ...defaultValues,
  },
  resolver: yupResolver(schemaUpdate),
  onSuccess: callbackSuccess
})

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const salary_type = value.salary_type;
      const valueClone = {
        ..._.cloneDeep(value),
        currency: salary_type !== SALARY_STATE.NEGOTITATION ? value.currency : CURRENCY_STATE.VND,
        salary_type: salary_type,
        salary_from: convertCurrencyToNumber(value.salary_from),
        salary_to: convertCurrencyToNumber(value.salary_to),
      }

      mutate(valueClone)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    setValue,
  }
}

export default useUpdateJob
