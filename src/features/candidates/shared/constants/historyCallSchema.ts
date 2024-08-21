import dayjs from 'dayjs'
import { RULE_MESSAGES } from 'shared/constants/validate'
import * as yup from 'yup'

export const CreateHistoryCallSchema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('call name')).default(''),
  timeFrom: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('time from'))
    .nullable()
    .test(
      'is-before-to',
      'From time must be after the To time',
      function (value) {
        const { timeTo } = this.parent
        if (!value && !timeTo) return true
        return dayjs(value).isBefore(dayjs(timeTo))
      }
    ),
  timeTo: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('time to'))
    .nullable()
    .test(
      'is-before-to',
      'From time must be after the To time',
      function (value) {
        const { timeFrom } = this.parent
        if (!value && !timeFrom) return true
        return dayjs(timeFrom).isBefore(dayjs(value))
      }
    ),
  contactTo: yup.string(),
  contactType: yup.string().required(RULE_MESSAGES.MC1('contact type')),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
  contactDate: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('contact date'))
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
  name: yup.string().required(RULE_MESSAGES.MC1('call name')).default(''),
  timeFrom: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('time from'))
    .nullable()
    .test(
      'is-before-to',
      'From time must be after the To time',
      function (value) {
        const { timeTo } = this.parent
        if (!value && !timeTo) return true
        return dayjs(value).isBefore(dayjs(timeTo))
      }
    ),
  timeTo: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('time to'))
    .nullable()
    .test(
      'is-before-to',
      'From time must be after the To time',
      function (value) {
        const { timeFrom } = this.parent
        if (!value && !timeFrom) return true
        return dayjs(timeFrom).isBefore(dayjs(value))
      }
    ),
  contactTo: yup.string(),
  contactType: yup.string().required(RULE_MESSAGES.MC1('contact type')),
  description: yup
    .string()
    .required(RULE_MESSAGES.MC1('description'))
    .default(''),
  attachments: yup.mixed(),
  contactDate: yup
    .date()
    .typeError(RULE_MESSAGES.MC5('contact date'))
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
  typeof EditHistoryCallSchema
>
