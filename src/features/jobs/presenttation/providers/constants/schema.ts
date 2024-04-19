import * as yup from 'yup'

export const schema = yup.object({
  teams: yup.object().required(),
  title: yup.string().max(64).required(),
  location: yup.object().required(),
  requester: yup.object().required(),
  salary: yup.object().required(),
  staft_required: yup.number().required(),
  salary_from: yup
    .number()
    // .required()
    .positive('Salary from must be a positive number')
    .max(yup.ref('salary_to'), 'Salary from must be less than salary to'),
  salary_to: yup
    .number()
    // .required()
    .positive('Salary to must be a positive number')
    .min(yup.ref('salary_from'), 'Salary to must be greater than salary from'),
  money_upto: yup.number().positive('Salary from must be a positive number'),
  money_minimum: yup.number().positive('Salary from must be a positive number'),
  currency: yup.object().required(),
  description: yup.string(),
  // managers: yup.array().of(
  //   yup.object({
  //     name: yup.string().required(),
  //     id: yup.number().required(),
  //     email: yup.string().required(),
  //   })
  // ),
})

export type FormDataSchema = yup.InferType<typeof schema>
