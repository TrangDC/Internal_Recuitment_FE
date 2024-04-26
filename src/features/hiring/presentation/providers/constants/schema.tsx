import * as yup from 'yup'

export const schema = yup.object({
    name: yup.string().required(),
    team: yup.object().required(),
    email: yup.string().email().required(),
    position: yup.object().required()
  })
  
  export type FormDataSchema = yup.InferType<typeof schema>