import * as yup from 'yup'

export const schema = yup.object({
    name: yup.string().required(),
    managers: yup.array().min(1),
  })
  
  export type FormDataSchema = yup.InferType<typeof schema>