import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { FormDataSchemaUpdate, schemaUpdate } from '../../providers/constants/schema'
import {
  Job,
  UpdateHiringJobInput,
} from 'features/jobs/domain/interfaces'
import _, { isEmpty } from 'lodash'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import getMembersByTeam from 'shared/hooks/graphql/getMemberByTeam'

type UseEditJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateJob(props: UseEditJobProps) {
  const { id, onSuccess } = props
  const { updateJob, getJobDetail, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Job,
    FormDataSchemaUpdate,
    UpdateHiringJobInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateJob,
    oneBuildQuery: getJobDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
 
      return {
        name: data?.name ?? '',
        priority: data?.priority.toString() ?? '',
        team_id: data?.team.id ?? '',
        location: data?.location ?? '',
        amount: data?.amount.toString() ?? '',
        salary_type: data?.salary_type ?? '',
        salary_from: data?.salary_from.toString() ?? '',
        salary_to: data?.salary_to.toString() ?? '',
        currency: data?.currency ?? '',
        created_by: data?.user.id ?? '',
        description: data?.description ?? '',
        skill: data?.skill ?? [],
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      const salary_type = value.salary_type;
      const valueClone = {
        ..._.cloneDeep(value),
        currency: salary_type !== SALARY_STATE.NEGOTITATION ? value.currency : CURRENCY_STATE.VND,
        salary_type: salary_type,
        salary_from: convertCurrencyToNumber(value.salary_from),
        salary_to: convertCurrencyToNumber(value.salary_to),
        amount: Number(value.amount)
      }

      mutate(valueClone as UpdateHiringJobInput)
    })()
  }

  const resetSalary = () => {
    setValue('salary_from', '0')
    setValue('salary_to', '0')
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  const handleChangeManager = async (team_id: string) => {
    if (!team_id) {
      setValue('created_by', '')
      return
    }

    const { member_first } = await getMembersByTeam(team_id)
    if (isEmpty(member_first)) {
      setValue('created_by', '')
      return
    }
    setValue('created_by', member_first?.id)
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      callbackSubmit,
      handleChangeManager,
      resetSalary
    },
    formState,
    setValue,
    isGetting
  }
}

export default useUpdateJob