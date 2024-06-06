import { SALARY_STATE } from 'shared/constants/constants'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1("team")),
  name: yup.string().max(64, RULE_MESSAGES.MC4("name", 64)).required(RULE_MESSAGES.MC1("name")),
  location: yup.string().required(RULE_MESSAGES.MC1("location")),
  created_by: yup.string().required(RULE_MESSAGES.MC1("requester")),
  amount: yup.string().required(RULE_MESSAGES.MC1("staff required")).test('validator-amount', function(value) {
    const amount = convertCurrencyToNumber(value)
    if(amount <= 0) {
      return this.createError({ 
        path: this.path,
        message: "Staff required must be greater than 0",
      })
    }

    return true;
  }),
  salary_type: yup.string().required(RULE_MESSAGES.MC1("salary")),
  salary_from: yup.string().required(RULE_MESSAGES.MC1("salary from")),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1("salary to"))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: "Salary to must be after Salary from",
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1("unit"))
  }),
  description: yup.string().required(RULE_MESSAGES.MC1("job description")),
  priority: yup.string().required(RULE_MESSAGES.MC1("priority")),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  team_id: yup.string().required(RULE_MESSAGES.MC1("team")),
  name: yup.string().max(64, RULE_MESSAGES.MC4("name", 64)).required(RULE_MESSAGES.MC1("name")),
  location: yup.string().required(RULE_MESSAGES.MC1("location")),
  created_by: yup.string().required(RULE_MESSAGES.MC1("requester")),
  amount: yup.string().required(RULE_MESSAGES.MC1("staff required")).test('validator-amount', function(value) {
    const amount = convertCurrencyToNumber(value)
    if(amount <= 0) {
      return this.createError({
        path: this.path,
        message: "Staff required must be greater than 0",
      })
    }

    return true;
  }),
  salary_type: yup.string().required(RULE_MESSAGES.MC1("salary")),
  salary_from: yup.string().required(RULE_MESSAGES.MC1("salary from")),
  salary_to: yup
    .string()
    .required(RULE_MESSAGES.MC1("salary to"))
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value)
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from)

      if (
        salary_from > salary_to &&
        this.parent?.salary_type !== SALARY_STATE.MINIMUM
      ) {
        return this.createError({
          path: this.path,
          message: "Salary to must be after Salary from",
        })
      }

      return true
    }),
  currency: yup.string().when(['salary_type'], ([salary_type], schema) => {
    return salary_type === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required(RULE_MESSAGES.MC1("unit"))
  }),
  description: yup.string().required(RULE_MESSAGES.MC1("job description")),
  priority: yup.string().required(RULE_MESSAGES.MC1("priority")),
  note: yup.string()
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaChangeStatus = yup.object({
  status: yup.string().required(RULE_MESSAGES.MC1("status")),
  note: yup.string(),
})

export type FormDataSchemaChangeStatus = yup.InferType<typeof schemaChangeStatus>
