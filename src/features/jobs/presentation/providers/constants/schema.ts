import { SALARY_STATE } from 'shared/constants/constants'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import { convertCurrencyToNumber } from 'shared/utils/utils'
import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.object().required(),
  name: yup.string().max(64).required(),
  location: yup.object().required('location is required!'),
  created_by: yup.object().required(),
  amount: yup.number().required(),
  salary_type: yup.object().required('salary is required!'),
  salary_from: yup
    .string()
    .required(),
  salary_to: yup
    .string()
    .required()
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value);
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from);

      if (salary_from > salary_to) {
        return this.createError({
          path: this.path,
          message: 'Salary To lớn hơn salary from',
        });
      }

      return true;
    }),
  currency: yup.object().when(['salary_type'], ([salary_type], schema) => {
    return salary_type?.value === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required('currency is required!')
  }),
  description: yup.string().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(),
  team_id: yup.object().required(),
  name: yup.string().max(64).required(),
  location: yup.object().required('location is required!'),
  created_by: yup.object().required(),
  amount: yup.number().required(),
  salary_type: yup.object().required('salary is required!'),
  salary_from: yup
    .string()
    .required(),
  salary_to: yup
    .string()
    .required()
    .test('validator-salary', function (value) {
      const salary_to = convertCurrencyToNumber(value);
      const salary_from = convertCurrencyToNumber(this.parent?.salary_from);

      if (salary_from > salary_to) {
        return this.createError({
          path: this.path,
          message: 'Salary To lớn hơn salary from',
        });
      }

      return true;
    }),
  currency: yup.object().when(['salary_type'], ([salary_type], schema) => {
    return salary_type?.value === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required('currency is required!')
  }),
  description: yup.string(),
  note: yup.string().required(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote;
export type FormDataSchemaDelete = FormDataSchemaNote;
