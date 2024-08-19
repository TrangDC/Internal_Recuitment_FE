import { isPast } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

export const CreateHistoryCallSchema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('call name'))
    .max(64, RULE_MESSAGES.MC4('call name', 64))
    .default(''),
  timeFrom: yup.mixed<Dayjs>().nullable(),
  timeTo: yup.mixed<Dayjs>().nullable(),
  contactTo: yup.string(),
  contactType: yup.string().required(RULE_MESSAGES.MC1('contact type')),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
  contactDate: yup
    .mixed<Dayjs>()
    .nullable()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .test('is_null', function () {
      const contactDate = this.parent?.contactDate
      if (!contactDate) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('date'),
        })
      }
      return true
    }),
})


export const EditHistoryCallSchema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('call name'))
    .max(64, RULE_MESSAGES.MC4('call name', 64))
    .default(''),
  timeFrom: yup.mixed<Dayjs>().nullable(),
  timeTo: yup.mixed<Dayjs>().nullable(),
  contactTo: yup.string(),
  contactType: yup.string().required(RULE_MESSAGES.MC1('contact type')),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
  contactDate: yup
    .mixed<Dayjs>()
    .nullable()
    .typeError(RULE_MESSAGES.MC5('Date'))
    .test('is_null', function () {
      const contactDate = this.parent?.contactDate
      if (!contactDate) {
        return this.createError({
          path: this.path,
          message: RULE_MESSAGES.MC1('date'),
        })
      }
      return true
    }),
})

export type FormDataSchemaCreateHistoryCall = yup.InferType<
  typeof CreateHistoryCallSchema
>


export type FormDataSchemaEditHistoryCall = yup.InferType<
  typeof EditHistoryCallSchema>