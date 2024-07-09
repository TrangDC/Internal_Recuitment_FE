import * as yup from 'yup'

export const schemaNote = yup.object({
  id: yup.string().required(),
  note: yup.string(),
})

export type FormDataSchemaNote = yup.InferType<typeof schemaNote>

export type SchemaInputNote = {
  id: string,
  note?: string,
}

export type CandidateStatusEnum =
  | 'applied'
  | 'interviewing'
  | 'offering'
  | 'hired'
  | 'kiv'
  | 'offer_lost'
  | 'ex_staff'
  | 'new'
