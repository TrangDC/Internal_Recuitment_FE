import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  team: yup.object().required(),
  email: yup.string().email().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  name: yup.string().required(RULE_MESSAGES.MC1('name')),
  // team: yup.string().required(),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  work_email: yup.string().email(RULE_MESSAGES.MC5('work_email')).required(RULE_MESSAGES.MC1('work_email')),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  status: yup.string().required(RULE_MESSAGES.MC1('status')),
  note: yup.string(),
});
export type FormDataSchemaUpdateStatus = yup.InferType<typeof schemaChangeStatus>
