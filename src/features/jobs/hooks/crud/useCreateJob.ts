import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { isEmpty } from 'lodash'
import { convertCurrencyToNumber, updateRecordSkill } from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import getMembersByTeam from 'shared/hooks/graphql/getMemberByTeam'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { CreateHiringJobArguments } from 'shared/schema/database/hiring_job'

interface createJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateJob(props: createJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props
  const { createJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateHiringJobArguments,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createJob,
    defaultValues: {
      name: '',
      salary_from: '0',
      salary_to: '0',
      entity_skill_records: {},
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const salary_type = value.salary_type
      const entity_skill = updateRecordSkill(value.entity_skill_records)
      const currency = value?.currency ?? CURRENCY_STATE.VND
      const payload: CreateHiringJobArguments = {
        input: {
          currency:
            salary_type !== SALARY_STATE.NEGOTITATION
              ? currency
              : CURRENCY_STATE.VND,
          salary_type: salary_type,
          salary_from: convertCurrencyToNumber(value.salary_from),
          salary_to: convertCurrencyToNumber(value.salary_to),
          status: 'opened',
          entity_skill_records: entity_skill,
          amount: value?.amount ? Number(value?.amount) : 0,
          name: value?.name,
          created_by: value?.created_by,
          description: value?.description,
          hiring_team_id: value?.hiring_team_id,
          location: value?.location,
          priority: Number(value?.priority),
          job_position_id: value?.job_position_id
        },
        note: '',
      }
      mutate(payload)
    })()
  }

  const handleChangeManager = async (hiring_team_id: string) => {
    if (!hiring_team_id) {
      setValue('created_by', '')
      return
    }

    const { managers_first } = await getMembersByTeam(hiring_team_id)
    if (isEmpty(managers_first)) {
      setValue('created_by', '')
      return
    }
    setValue('created_by', managers_first?.id)
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
    formState,
    action: {
      resetSalary,
      handleChangeManager,
      onSubmit,
    },
  }
}

export default useCreateJob
