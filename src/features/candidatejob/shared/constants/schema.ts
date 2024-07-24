import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'

export const schema = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate_id')),
  hiring_job_id: yup.string().required(RULE_MESSAGES.MC1('job name')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  attachments: yup
    .array()
    .required(RULE_MESSAGES.MC1('attachments'))
    .min(1, 'CV is missing'),
  note: yup.string(),
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
    if(status !== STATUS_CANDIDATE.OFFERING) return schema;
    return schema.required(RULE_MESSAGES.MC1('Offer expiration date'));
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
    if(status !== STATUS_CANDIDATE.OFFERING) return schema;
    return schema.required(RULE_MESSAGES.MC1('Candidate onboard date'));
  })
  .nullable(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  failed_reason: yup
    .array()
    .test(
      'failed-reason',
      RULE_MESSAGES.MC1('failed_reason'),
      function (value) {
        const { status, failed_reason } = this.parent
        if (
          status === STATUS_CANDIDATE.OFFERED_LOST ||
          status === STATUS_CANDIDATE.KIV
        ) {
          return !isEmpty(failed_reason)
        }

        return true
      }
    ),
  attachments: yup.mixed(),
  feedback: yup.string(),
  note: yup.string(),
  //new field
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
      if(status !== STATUS_CANDIDATE.OFFERING) return schema;
      return schema.required(RULE_MESSAGES.MC1('Offer expiration date'));
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
      if(status !== STATUS_CANDIDATE.OFFERING) return schema;
      return schema.required(RULE_MESSAGES.MC1('Candidate onboard date'));
    })
    .nullable(),
})

export const schemaUpdateJobAttachment = yup.object({
  attachments: yup.mixed(),
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>

export type FormDataSchemaUpdateJobAttachments = yup.InferType<
  typeof schemaUpdateJobAttachment
>
