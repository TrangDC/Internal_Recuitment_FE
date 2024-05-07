import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  members: yup.array().min(1).required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  members: yup.array().min(1).required(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = yup.object({
  id: yup.string().required(),
  description: yup.string().required(),
})

export type FormDataSchemaDelete = yup.InferType<typeof schemaDelete>