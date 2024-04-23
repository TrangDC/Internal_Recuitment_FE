import * as yup from 'yup'

export const schema = yup.object({
  teams: yup.object().required(),
  phone_number: yup.string().required(),
  email: yup.string().required(),
  dateOfBirth: yup.string().required(),
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaInterview = yup.object({
  team: yup.object().required(),
  job_name: yup.string().required(),
  interviewers: yup.object().required(),
  date: yup.string().required(),
  from_date: yup.string().required(),
  to_date: yup.string().required(),
  description: yup.string(),
})

export type FormDataSchemaInterview = yup.InferType<typeof schemaInterview>

export const schemaFeedback = yup.object({
  name: yup.string().required(),
  description: yup.string(),
})

export type FormDataSchemaFeedback = yup.InferType<typeof schemaFeedback>