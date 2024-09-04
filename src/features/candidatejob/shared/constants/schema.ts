import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import { application_data } from 'shared/components/autocomplete/candidate-status-auto-complete'

export const schema = yup.object({
  hiring_team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate_id')),
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
      'Onboard date must be after Offer expiration date',
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

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  failed_reason: yup
    .array()
    .test(
      'failed-reason',
      RULE_MESSAGES.MC1('Failed reason'),
      function (value) {
        const { status, failed_reason } = this.parent
        if (
          status === application_data.failed_cv.value ||
          status === application_data.offer_lost.value ||
          status === application_data.failed_interview.value
        ) {
          return !isEmpty(failed_reason)
        }

        return true
      }
    ),
  attachments: yup.mixed(),
  feedback: yup.string(),
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
})

export const schemaUpdateJobAttachment = yup.object({
  attachments: yup.mixed(),
  rec_in_charge_id: yup.string().required(RULE_MESSAGES.MC1('REC in charge')),
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>

export type FormDataSchemaUpdateJobAttachments = yup.InferType<
  typeof schemaUpdateJobAttachment
>
