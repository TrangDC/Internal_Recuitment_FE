import * as yup from 'yup'

export const schema = yup.object({
  job_title: yup.string().required(),
  interviewers: yup.object().required(),
  date: yup.string().required(),
  from_date: yup.string().required(),
  to_date: yup.string().required(),
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>