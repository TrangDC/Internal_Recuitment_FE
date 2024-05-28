import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/vaildate'

export const schema = yup.object({
  candidate_job_id: yup.string().required(RULE_MESSAGES.MC1('candidate_job_id')),
  attachments: yup.mixed(),
  feedback: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>


export const schemaUpdate = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  attachments: yup.mixed(),
  feedback: yup.string(),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  note: yup.string(),
});
export type FormDataSchemaDelete = yup.InferType<typeof schemaDelete>
