import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/validate'

export const schema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255)),
  leader_id: yup.string().required(RULE_MESSAGES.MC1('leader')),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255))
    .default(''),
  leader_id: yup.string().required(RULE_MESSAGES.MC1('leader')),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
