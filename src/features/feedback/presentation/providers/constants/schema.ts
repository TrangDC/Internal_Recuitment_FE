import * as yup from 'yup'

export const schema = yup.object({
  attachments: yup.mixed().required(),
  description: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>