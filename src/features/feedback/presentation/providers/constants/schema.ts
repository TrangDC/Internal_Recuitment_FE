import * as yup from 'yup'

export const schema = yup.object({
  candidate_job_id: yup.string().required(),
  attachments: yup.mixed().required(),
  feedback: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>
