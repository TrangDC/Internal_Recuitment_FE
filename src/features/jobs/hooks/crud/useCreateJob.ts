import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { convertCurrencyToNumber, updateRecordSkill } from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CreateHiringJobArguments,
  HiringJobLevel,
} from 'shared/schema/database/hiring_job'
import { useAuthorization } from 'features/authorization/hooks/useAuthorization'
import useGenerateJD from './useGenerateJd'
import toast from 'react-hot-toast'
import { formatJobDescription } from 'features/jobs/shared/utils'

interface createJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateJob(props: createJobProps = { defaultValues: {} }) {
  const { user } = useAuthorization()
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
      hiring_team_id: user?.teamId ?? '',
      created_by: user?.id ?? '',
      description: '',
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: (data) => {
      callbackSuccess?.(data)
    },
  })

  const { handleSubmit, control, formState, setValue, getValues, clearErrors } =
    useFormReturn
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
          entity_skill_records: entity_skill,
          amount: value?.amount ? Number(value?.amount) : 0,
          name: value?.name,
          created_by: value?.created_by,
          description: value?.description,
          hiring_team_id: value?.hiring_team_id,
          location: value?.location,
          priority: Number(value?.priority),
          job_position_id: value?.job_position_id,
          level: value?.level as HiringJobLevel,
          rec_team_id: value?.rec_team_id,
          note: value?.note ?? '',
        },
        note: '',
      }
      mutate(payload)
    })()
  }

  const resetSalary = () => {
    setValue('salary_from', '0')
    setValue('salary_to', '0')
    clearErrors(['salary_from', 'salary_to'])
  }

  const updateDescription = (description: string) => {
    setValue('description', description)
  }

  const { generateJD, loading } = useGenerateJD({
    onSuccess: (data) => {
      toast.success('Job description generated successfully!')
      const formattedDescription = formatJobDescription(data)
      setValue('description', formattedDescription)
    },
  })

  function handleGenerateJD() {
    const data = getValues()
    generateJD({
      name: data.name,
      title: data.name,
      working_location: data.location,
      salary_from: parseInt(data.salary_from.replace(/,/g, ''), 10),
      salary_to: parseInt(data.salary_to.replace(/,/g, ''), 10),
      currency:
        data.salary_type === 'negotiate' ? 'negotiate' : data.salary_type,
      employee_level: data.level,
      working_hour_from: '8:30',
      working_hour_to: '17:30',
      employment_type: 'fulltime',
    })
  }

  return {
    control,
    isValid,
    isPending,
    setValue,
    formState,
    getValues,
    loadingBtnGenerate: loading,
    action: {
      resetSalary,
      onSubmit,
      updateDescription,
      handleGenerateJD,
    },
  }
}

export default useCreateJob
