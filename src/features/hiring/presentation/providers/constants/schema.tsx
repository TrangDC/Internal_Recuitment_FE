import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  team: yup.object().required(),
  email: yup.string().email().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  team: yup.object().required(),
  email: yup.string().email().required(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote;
export type FormDataSchemaDelete = FormDataSchemaNote
