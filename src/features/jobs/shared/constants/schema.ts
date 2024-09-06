import dayjs from 'dayjs'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'
import { SALARY_STATE } from 'shared/constants/constants'
import { RULE_MESSAGES } from 'shared/constants/validate'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  name: yup
    .string()
    .max(255, RULE_MESSAGES.MC4('Job name', 255))
    .required(RULE_MESSAGES.MC1('Job name')),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  created_by: yup.string().required(RULE_MESSAGES.MC1('requester')),
  amount: yup
    .string()
    .required(RULE_MESSAGES.MC1('staff required'))
    .test('validator-amount', function (value) {
      const amount = convertCurrencyToNumber(value)
      if (amount <= 0) {
        return this.createError({
          path: this.path,
          message: 'Staff required must be greater than 0',
        })
      }

      return true
    }),
  salary_type: yup.string().required(RULE_MESSAGES.MC1('salary')),
  salary_from: yup.string().required(RULE_MESSAGES.MC1('salary from')),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1('salary to'))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: 'Salary to must be after Salary from',
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1('unit'))
  }),
  entity_skill_records: yup.mixed(),
  description: yup.string().default(''),
  priority: yup.string().required(RULE_MESSAGES.MC1('priority')),
  job_position_id: yup.string().required(RULE_MESSAGES.MC1('Job position')),
  level: yup.string().required(RULE_MESSAGES.MC1('level')),
  rec_team_id: yup.string().required(RULE_MESSAGES.MC1('REC team')),
  note: yup.string().max(512, RULE_MESSAGES.MC4('Note', 512)),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  name: yup
    .string()
    .max(255, RULE_MESSAGES.MC4('Job name', 255))
    .required(RULE_MESSAGES.MC1('Job name')),
  location: yup.string().required(RULE_MESSAGES.MC1('location')),
  created_by: yup.string().required(RULE_MESSAGES.MC1('requester')),
  amount: yup
    .string()
    .required(RULE_MESSAGES.MC1('staff required'))
    .test('validator-amount', function (value) {
      const amount = convertCurrencyToNumber(value)
      if (amount <= 0) {
        return this.createError({
          path: this.path,
          message: 'Staff required must be greater than 0',
        })
      }

      return true
    }),
  salary_type: yup.string().required(RULE_MESSAGES.MC1('salary')),
  salary_from: yup.string().required(RULE_MESSAGES.MC1('salary from')),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1('salary to'))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: 'Salary to must be after Salary from',
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1('unit'))
  }),
  entity_skill_records: yup.mixed(),
  description: yup.string(),
  priority: yup.string().required(RULE_MESSAGES.MC1('priority')),
  job_position_id: yup.string().required(RULE_MESSAGES.MC1('Job position')),
  level: yup.string().required(RULE_MESSAGES.MC1('level')),
  rec_team_id: yup.string().required(RULE_MESSAGES.MC1('REC team')),
  rec_in_charge_id: yup.string().required(RULE_MESSAGES.MC1('REC in charge')),
  status: yup.string(),
  note: yup.string().max(512, RULE_MESSAGES.MC4('Note', 512)),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  note: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>

export const schemaUpdateStepStatus = yup.object({
  hiring_job_ids: yup
    .array()
    .required(RULE_MESSAGES.MC1('status'))
    .min(1, RULE_MESSAGES.MC1('Hing job')),
  status: yup.string(),
  note: yup.string(),
})

export type FormDataSchemaUpdateJobStatus = yup.InferType<
  typeof schemaUpdateStepStatus
>

export const schemaApplyJob = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  hiring_job_id: yup.string().required(RULE_MESSAGES.MC1('job name')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  attachments: yup.array().required(RULE_MESSAGES.MC1('attachments')),
  offer_expiration_date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Offer expiration date'))
    .min(
      dayjs().startOf('day').toDate(),
      'Offer expiration date must be after or equal current date'
    )
    .test(
      'is-before-to',
      'Onboard date must be after  Offer expiration date',
      function (value) {
        const { onboard_date } = this.parent
        if (!onboard_date) return true
        return dayjs(value).isBefore(dayjs(onboard_date))
      }
    )
    .when(['status'], ([status], schema) => {
      if (status !== application_data.offering.value) return schema
      return schema.required(RULE_MESSAGES.MC1('Offer expiration date'))
    })
    .nullable(),
  onboard_date: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('Candidate onboard date'))
    .min(
      dayjs().startOf('day').toDate(),
      'Onboard date must be after or equal current date'
    )
    .when(['status'], ([status], schema) => {
      if (status !== application_data.offering.value) return schema
      return schema.required(RULE_MESSAGES.MC1('Candidate onboard date'))
    })
    .nullable(),
  level: yup
    .string()
    .when(['status'], ([status], schema) => {
      if (status !== application_data.offering.value) return schema
      return schema.required(RULE_MESSAGES.MC1('level'))
    })
    .nullable(),
  rec_in_charge_id: yup.string().required(RULE_MESSAGES.MC1('REC in charge')),
})

export type FormDataSchemaApplyJob = yup.InferType<typeof schemaApplyJob>
