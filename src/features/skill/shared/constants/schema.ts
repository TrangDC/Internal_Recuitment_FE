import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255)),
  description: yup.string().max(255, RULE_MESSAGES.MC4('description', 255)),
  skill_type_id: yup.string().required(RULE_MESSAGES.MC1('type')),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255)),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  skill_type_id: yup.string().required(RULE_MESSAGES.MC1('type')),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDetail = yup.object({
  id: yup.string(),
  name: yup.string(),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})
export type FormDataSchemaDetail = yup.InferType<typeof schemaDetail>
