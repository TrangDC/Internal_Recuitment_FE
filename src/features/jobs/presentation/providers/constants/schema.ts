import { SALARY_STATE } from 'shared/constants/constants'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1("team_id")),
  name: yup.string().max(64, RULE_MESSAGES.MC4("name", 64)).required(RULE_MESSAGES.MC1("name")),
  location: yup.string().required(RULE_MESSAGES.MC1("location")),
  created_by: yup.string().required(RULE_MESSAGES.MC1("created_by")),
  amount: yup.number().typeError(RULE_MESSAGES.MC5("amount")).required(RULE_MESSAGES.MC1("amount")),
  salary_type: yup.string().required(RULE_MESSAGES.MC1("salary_type")),
  salary_from: yup.string().required(RULE_MESSAGES.MC1("salary_from")),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1("salary_to"))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: 'Salary To lớn hơn salary from',
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1("currency"))
  }),
  description: yup.string().required(RULE_MESSAGES.MC1("description")),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(),
  team_id: yup.string().required(RULE_MESSAGES.MC1("team_id")),
  name: yup.string().max(64, RULE_MESSAGES.MC4("name", 64)).required(RULE_MESSAGES.MC1("name")),
  location: yup.string().required(RULE_MESSAGES.MC1("location")),
  created_by: yup.string().required(RULE_MESSAGES.MC1("created_by")),
  amount: yup.number().typeError(RULE_MESSAGES.MC5("amount")).required(RULE_MESSAGES.MC1("amount")),
  salary_type: yup.string().required(RULE_MESSAGES.MC1("salary_type")),
  salary_from: yup.string().required(RULE_MESSAGES.MC1("salary_from")),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1("salary_to"))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: 'Salary To lớn hơn salary from',
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1("currency"))
  }),
  description: yup.string().required(RULE_MESSAGES.MC1("description")),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaChangeStatus = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1("id")),
  status: yup.string().required(RULE_MESSAGES.MC1("status")),
  note: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<typeof schemaChangeStatus>
