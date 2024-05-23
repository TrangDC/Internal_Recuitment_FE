import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1('team_id')),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate_id')),
  hiring_job_id: yup.object().required(RULE_MESSAGES.MC1('hiring_job_id')),
  status: yup.object().required(RULE_MESSAGES.MC1('status')),
  attachments: yup.array().required(RULE_MESSAGES.MC1('attachments')).min(1, RULE_MESSAGES.MC3('attachments', 1)),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaChangeStatus = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  status: yup.object().required(RULE_MESSAGES.MC1('status')),
  attachments: yup.mixed(),
  feedback: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<typeof schemaChangeStatus>