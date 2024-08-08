import dayjs from 'dayjs'
import { STATUS_CANDIDATE } from 'shared/class/candidate'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

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
