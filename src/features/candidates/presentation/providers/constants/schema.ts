import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().matches(/^(0|84)\d{9}$/, RULE_MESSAGES.MC5('phone')).required(RULE_MESSAGES.MC1('phone')),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().required(RULE_MESSAGES.MC1('date')),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().matches(/^(0|84)\d{9}$/, RULE_MESSAGES.MC5('phone')).required(RULE_MESSAGES.MC1('phone')),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().required(RULE_MESSAGES.MC1('date')),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaBlackList = yup.object({
  id: yup.string().required(),
  note: yup.string().required(),
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