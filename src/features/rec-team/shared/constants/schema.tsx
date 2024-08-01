import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/validate'

export const schema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(64, RULE_MESSAGES.MC4('name', 64)),
  leader_id: yup.string().required(RULE_MESSAGES.MC1('leader')),
  description: yup.string().max(255, RULE_MESSAGES.MC4('description', 255)),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(64, RULE_MESSAGES.MC4('name', 64))
    .default(''),
  leader_id: yup.string().required(RULE_MESSAGES.MC1('leader')),
  description: yup.string().max(255, RULE_MESSAGES.MC4('description', 255)),
  note: yup.string().default(''),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
