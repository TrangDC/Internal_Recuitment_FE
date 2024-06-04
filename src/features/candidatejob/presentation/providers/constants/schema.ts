import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'
import { STATUS_CANDIDATE } from 'shared/constants/constants'
import { isEmpty } from 'lodash'

export const schema = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1('team')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate_id')),
  hiring_job_id: yup.string().required(RULE_MESSAGES.MC1('job name')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  attachments: yup
    .array()
    .required(RULE_MESSAGES.MC1('attachments'))
    .min(1, "CV is missing"),
  note: yup.string(),
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
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>