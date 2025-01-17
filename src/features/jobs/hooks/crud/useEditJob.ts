import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import {
  FormDataSchemaUpdate,
  schemaUpdate,
} from '../../shared/constants/schema'
import { isEmpty } from 'lodash'
import {
  convertCurrencyToNumber,
  formatRecordSkill,
  updateRecordSkill,
} from 'shared/utils/utils'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import getMembersByTeam from 'shared/hooks/graphql/getMemberByTeam'
import HiringJob, {
  EditHiringJobArguments,
  HiringJobLevel,
} from 'shared/schema/database/hiring_job'
import useGenerateJD from './useGenerateJd'
import { formatJobDescription } from 'features/jobs/shared/utils'
import { toast } from 'react-toastify'
import useEditResourceWithoutGetting from 'shared/hooks/crud-hook/useEditResourceWithoutGetting'
import { JobStatus } from 'shared/class/job-status'
import {
  TalenaEmploymentType,
  TalenaSalaryType,
  TalenaWorkModel,
  TransferEnumsTRECtoTalena,
} from 'services/talena-api-services'

type UseEditJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useUpdateJob(props: UseEditJobProps) {
  const { id, onSuccess } = props
  const {
    updateOpenedHiringJob,
    updatePendingApprovalsHiringJob,
    getJobDetail,
    queryKey,
  } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    HiringJob,
    FormDataSchemaUpdate,
    EditHiringJobArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateOpenedHiringJob,
    oneBuildQuery: getJobDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const entity_skill_records = formatRecordSkill(data?.entity_skill_types)
      return {
        name: data?.name ?? '',
        priority: data?.priority?.toString() ?? '',
        hiring_team_id: data?.hiring_team?.id ?? '',
        location: data?.location ?? '',
        amount: data?.amount.toString() ?? '',
        salary_type: data?.salary_type ?? '',
        salary_from: data?.salary_from.toString() ?? '',
        salary_to: data?.salary_to.toString() ?? '',
        currency: data?.currency ?? '',
        created_by: data?.user.id ?? '',
        description: data?.description ?? '',
        entity_skill_records: entity_skill_records,
        note: data?.note ?? '',
        job_position_id: data?.job_position_id ?? '',
        level: data?.level ?? '',
        rec_in_charge_id: data?.rec_in_charge?.id ?? '',
        rec_team_id: data?.rec_team?.id ?? '',
        status: data?.status ?? '',
      }
    },
  })

  const actionPendingApproval = useEditResourceWithoutGetting<
    FormDataSchemaUpdate,
    EditHiringJobArguments
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updatePendingApprovalsHiringJob,
    queryKey: [queryKey],
    onSuccess,
    formatDefaultValues: {},
  })

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    getValues,
    watch,
    clearErrors,
  } = useFormReturn
  const mutatePendingApproval = actionPendingApproval.useEditReturn.mutate
  const { isValid, isDirty } = formState
  const isValidEdit = !isValid || !isDirty
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      const salary_type = value.salary_type
      const entity_skill = updateRecordSkill(value.entity_skill_records)
      const currency = value?.currency ?? CURRENCY_STATE.VND
      const payload: EditHiringJobArguments = {
        id,
        input: {
          currency:
            salary_type !== SALARY_STATE.NEGOTITATION
              ? currency
              : CURRENCY_STATE.VND,
          salary_type: salary_type,
          salary_from: convertCurrencyToNumber(value.salary_from),
          salary_to: convertCurrencyToNumber(value.salary_to),
          amount: Number(value.amount),
          entity_skill_records: entity_skill,
          description: value?.description ?? '',
          hiring_team_id: value?.hiring_team_id,
          location: value?.location,
          name: value?.name,
          priority: Number(value?.priority),
          job_position_id: value?.job_position_id,
          level: value?.level as HiringJobLevel,
          rec_team_id: value?.rec_team_id,
          note: value?.note ?? '',
          rec_in_charge_id: value?.rec_in_charge_id,
          created_by: value?.created_by ?? '',
        },
        note: note,
      }

      switch (value?.status) {
        case JobStatus.STATUS_HIRING_JOB.OPENED:
          mutate(payload)
          break
        case JobStatus.STATUS_HIRING_JOB.PENDING_APPROVALS:
          mutatePendingApproval(payload)
          break
        default:
          return null
      }
    })()
  }

  const resetSalary = () => {
    setValue('salary_from', '0')
    setValue('salary_to', '0')
    clearErrors(['salary_from', 'salary_to'])
  }

  const resetRecInCharge = () => {
    setValue('rec_in_charge_id', '', {
      shouldDirty: true,
      shouldValidate: true,
    })
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
      employee_level: TransferEnumsTRECtoTalena.toEmployeeLevel(data.level),
      working_hour_from: '8:30',
      working_hour_to: '17:30',
      employment_type: TalenaEmploymentType.FULLTIME,
      negotiable: data.salary_type === 'negotiate',
      note: '',
      salaryType: TalenaSalaryType.HOURLY,
      work_model: TalenaWorkModel.REMOTE,
    })
  }

  return {
    control,
    isValid: isValidEdit,
    isPending,
    loadingBtnGenerate: loading === 'UPLOADING',
    watch,
    actions: {
      onSubmit,
      handleChangeManager,
      resetSalary,
      handleGenerateJD,
      resetRecInCharge,
    },
    formState,
    setValue,
    isGetting,
    getValues,
  }
}

export default useUpdateJob
