import { SALARY_STATE } from 'shared/constants/constants'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  team_id: yup.object().required(),
  name: yup.string().max(64).required(),
  location: yup.object().required('location is required!'),
  created_by: yup.object().required(),
  amount: yup.number().required(),
  salary_type: yup.object().required('salary is required!'),
  salary_from: yup
    .number()
    .required()
    .positive('Salary from must be a positive number')
    .when(['salary_type'], ([salary_type], schema) => {
      return salary_type?.value === SALARY_STATE.RANGE
        ? schema.max(yup.ref('salary_to')).min(0)
        : schema.min(0)
    }),
  salary_to: yup
    .number()
    .required()
    .positive('Salary to must be a positive number')
    .when(['salary_type'], ([salary_type], schema) => {
      return salary_type?.value === SALARY_STATE.RANGE
        ? schema.min(yup.ref('salary_from'))
        : schema.min(0)
    }),
  currency: yup.object().when(['salary_type'], ([salary_type], schema) => {
    return salary_type?.value === SALARY_STATE.NEGOTITATION
      ? schema.notRequired()
      : schema.required('currency is required!')
  }),
  description: yup.string(),
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
    .number()
    .required()
    .positive('Salary from must be a positive number')
    .when(['salary_type'], ([salary_type], schema) => {
      return salary_type?.value === SALARY_STATE.RANGE
        ? schema.max(yup.ref('salary_to')).min(0)
        : schema.min(0)
    }),
  salary_to: yup
    .number()
    .required()
    .positive('Salary to must be a positive number')
    .when(['salary_type'], ([salary_type], schema) => {
      return salary_type?.value === SALARY_STATE.RANGE
        ? schema.min(yup.ref('salary_from'))
        : schema.min(0)
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
