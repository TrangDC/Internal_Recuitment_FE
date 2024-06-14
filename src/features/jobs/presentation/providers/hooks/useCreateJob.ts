import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { NewHiringJobInput } from 'features/jobs/domain/interfaces'
import _, { isEmpty } from 'lodash'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import getMembersByTeam from 'shared/hooks/graphql/getMemberByTeam'
import { useCreateResource } from 'shared/hooks/crud-hook'

interface createJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateJob(props: createJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props
  const { createJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
  NewHiringJobInput,
  FormDataSchema
>({
  mutationKey: [queryKey],
  queryString: createJob,
  defaultValues: {
    name: '',
    salary_from: "0",
    salary_to: "0",
    note: '',
    skill: [],
    ...defaultValues,
  },
  resolver: yupResolver(schema),
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
        status: 'opened',
      }

      mutate(valueClone)
    })()
  }

  const handleChangeManager = async (team_id: string) => {
    if(!team_id) {
      setValue('created_by', '');
      return;
    }

    const { member_first } = await getMembersByTeam(team_id)
    if(isEmpty(member_first)) {
      setValue('created_by', '')
      return;
    };
    setValue('created_by', member_first?.id)
  }

  const resetSalary = () => {
    setValue('salary_from', '0')
    setValue('salary_to', '0')
  }

  return {
    control,
    isValid,
    isPending,
    setValue,
    action: {
      resetSalary,
      handleChangeManager,
      onSubmit,
    }
  }
}

export default useCreateJob
