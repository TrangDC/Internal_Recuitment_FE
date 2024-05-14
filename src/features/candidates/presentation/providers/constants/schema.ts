import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  dob: yup.string().required(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  dob: yup.string().required(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaBlackList = yup.object({
  id: yup.string().required(),
  description: yup.string().required(),
  is_black_list: yup.boolean().required(),
})
export type FormDataSchemaBlackList = yup.InferType<typeof schemaBlackList>

export const schemaApplyJob = yup.object({
  team_id: yup.object(),
  candidate_id: yup.string().required(),
  hiring_job_id: yup.object().required(),
  status: yup.object().required(),
  attachments: yup.mixed(),
})

export type FormDataSchemaApplyJob = yup.InferType<typeof schemaApplyJob>

//interview
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