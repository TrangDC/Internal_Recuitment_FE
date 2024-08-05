import * as yup from 'yup'
import { RULE_MESSAGES } from 'shared/constants/validate'

export const schema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255)),
  members: yup
    .array(yup.string().required())
    .required(RULE_MESSAGES.MC1("Team's Manager"))
    .min(1, RULE_MESSAGES.MC1("Team's Manager"))
    .default([]),
  approvers: yup
    .array()
    .of(
      yup.object().shape({
        uid: yup.string().required(),
        id: yup.string(),
        user_id: yup.string().required('approve'),
      })
    )
    .required(RULE_MESSAGES.MC1('approve')),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(255, RULE_MESSAGES.MC4('name', 255))
    .default(''),
  members: yup
    .array(yup.string().required())
    .required(RULE_MESSAGES.MC1("Team's Manager"))
    .min(1, RULE_MESSAGES.MC1("Team's Manager"))
    .default([]),
  description: yup.string().max(512, RULE_MESSAGES.MC4('description', 512)),
  approvers: yup
    .array()
    .of(
      yup.object().shape({
        uid: yup.string().required(),
        id: yup.string(),
        user_id: yup.string().required('approve'),
      })
    )
    .required(RULE_MESSAGES.MC1('approve')),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>
