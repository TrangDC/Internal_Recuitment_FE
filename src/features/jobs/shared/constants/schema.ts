import dayjs from 'dayjs'
import { STATUS_CANDIDATE } from 'shared/class/candidate'
import { SALARY_STATE } from 'shared/constants/constants'
import { RULE_MESSAGES } from 'shared/constants/validate'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  name: yup
    .string()
    .max(64, RULE_MESSAGES.MC4('Job name', 64))
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
  description: yup.string().required(RULE_MESSAGES.MC1('job description')),
  priority: yup.string().required(RULE_MESSAGES.MC1('priority')),
  job_position_id: yup.string().required(RULE_MESSAGES.MC1("Job position"))
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  name: yup
    .string()
    .max(64, RULE_MESSAGES.MC4('Job name', 64))
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
  description: yup.string().required(RULE_MESSAGES.MC1('job description')),
  priority: yup.string().required(RULE_MESSAGES.MC1('priority')),
  job_position_id: yup.string().required(RULE_MESSAGES.MC1("Job position"))
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  note: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>

export const schemaApplyJob = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate')),
  hiring_job_id: yup.string().required(RULE_MESSAGES.MC1('job name')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  attachments: yup
    .array()
    .required(RULE_MESSAGES.MC1('attachments'))
    .min(1, 'CV is missing'),
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
      if (status !== STATUS_CANDIDATE.OFFERING) return schema
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
      if (status !== STATUS_CANDIDATE.OFFERING) return schema
      return schema.required(RULE_MESSAGES.MC1('Candidate onboard date'))
    })
    .nullable(),
})

export type FormDataSchemaApplyJob = yup.InferType<typeof schemaApplyJob>
