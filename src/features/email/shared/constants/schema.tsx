import { isEmpty } from 'lodash'
import { RULE_MESSAGES } from 'shared/constants/validate'
import { RegexEmail } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  event: yup.string().required(RULE_MESSAGES.MC1('event')),
  subject: yup.string().required(RULE_MESSAGES.MC1('email subject')),
  content: yup.string().required(RULE_MESSAGES.MC1('email content')),
  send_to: yup
    .array()
    .required(RULE_MESSAGES.MC1('Send to'))
    .min(1, RULE_MESSAGES.MC1('Send to')),
  roleIds: yup.array(),
  signature: yup.string(),
  cc: yup
    .array<any, string>()
    .test('email_valid', RULE_MESSAGES.MC5('Cc'), function (email_list) {
      const not_valid = email_list?.filter((email) => {
        return !RegexEmail(email)
      })

      return isEmpty(not_valid)
    }),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  event: yup.string().required(RULE_MESSAGES.MC1('event')),
  subject: yup.string().required(RULE_MESSAGES.MC1('email subject')),
  content: yup.string().required(RULE_MESSAGES.MC1('email content')),
  send_to: yup
    .array()
    .required(RULE_MESSAGES.MC1('Send to'))
    .min(1, RULE_MESSAGES.MC1('Send to')),
  roleIds: yup.array(),
  signature: yup.string(),
  cc: yup
    .array()
    .test('email_valid', RULE_MESSAGES.MC5('Cc'), function (email_list) {
      const not_valid = email_list?.filter((email) => {
        return !RegexEmail(email)
      })

      return isEmpty(not_valid)
    }),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(),
})

export type FormDataSchemaChangeStatus = yup.InferType<
  typeof schemaChangeStatus
>
