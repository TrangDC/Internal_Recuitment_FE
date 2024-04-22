import * as yup from 'yup'

export const schema = yup.object({
  teams: yup.object().required(),
  phone_number: yup.string().required(),
  email: yup.string().required(),
  dateOfBirth: yup.string().required(),
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>
