import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/validate'

export const schema = yup.object({
  candidate_job_id: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate_job_id')),
  attachments: yup.mixed(),
  feedback: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  attachments: yup.mixed(),
  feedback: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
