import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().required(RULE_MESSAGES.MC1('phone')).matches(/^\+?\d+$/, RULE_MESSAGES.MC5("phone")).min(8, RULE_MESSAGES.MC2('phone', 8, 15)).max(15, RULE_MESSAGES.MC2('phone', 8, 15)),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().required(RULE_MESSAGES.MC1('phone')).matches(/^\+?\d+$/, RULE_MESSAGES.MC5("phone")).min(8, RULE_MESSAGES.MC2('phone', 8, 15)).max(15, RULE_MESSAGES.MC2('phone', 8, 15)),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaBlackList = yup.object({
  note: yup.string(),
  is_black_list: yup.boolean().required(RULE_MESSAGES.MC1('is_black_list')),
})
export type FormDataSchemaBlackList = yup.InferType<typeof schemaBlackList>