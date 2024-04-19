import * as yup from 'yup'

export const schema = yup.object({
    team_name: yup.string().required(),
    managers: yup.array().of(
      yup.object({
        name: yup.string().required(),
        id: yup.number().required(),
        email: yup.string().required(),
      })
    ),
  })
  
  export type FormDataSchema = yup.InferType<typeof schema>