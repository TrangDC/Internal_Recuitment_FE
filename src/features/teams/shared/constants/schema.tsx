import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/vaildate'

export const schema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  members: yup.array(),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)).default(''),
  members: yup.array().default([]),
  note: yup.string().default(''),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>