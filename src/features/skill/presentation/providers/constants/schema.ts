import { RULE_MESSAGES } from 'shared/constants/vaildate'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  description: yup.string().max(255, RULE_MESSAGES.MC4('email', 255)),
  skill_type_id: yup.string().required(RULE_MESSAGES.MC1('type')),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  description: yup.string().max(255, RULE_MESSAGES.MC4('email', 255)),
  skill_type_id: yup.string().required(RULE_MESSAGES.MC1('type')),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDetail = yup.object({
  id: yup.string(),
  name: yup.string(),
  description: yup.string(),
})
export type FormDataSchemaDetail = yup.InferType<typeof schemaDetail>