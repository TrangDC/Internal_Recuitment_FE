import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().required(RULE_MESSAGES.MC1('phone')).matches(/^(0|84|\+84)\d{9}$/, "Phone number needs to start with 84 or 0 and have 9 digits after the 0"),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  name: yup.string().required(RULE_MESSAGES.MC1('name')).max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup.string().required(RULE_MESSAGES.MC1('phone')).matches(/^(0|84|\+84)\d{9}$/, "Phone number needs to start with 84 or 0 and have 9 digits after the 0"),
  email: yup.string().email(RULE_MESSAGES.MC5('email')).required(RULE_MESSAGES.MC1('email')).max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaBlackList = yup.object({
  id: yup.string().required(RULE_MESSAGES.MC1('id')),
  note: yup.string(),
  is_black_list: yup.boolean().required(RULE_MESSAGES.MC1('is_black_list')),
})
export type FormDataSchemaBlackList = yup.InferType<typeof schemaBlackList>

export const schemaApplyJob = yup.object({
  team_id: yup.object(),
  candidate_id: yup.string().required(RULE_MESSAGES.MC1('candidate_id')),
  hiring_job_id: yup.object().required(RULE_MESSAGES.MC1('hiring_job_id')),
  status: yup.object().required(RULE_MESSAGES.MC1('status')),
  attachments: yup.mixed(),
})

export type FormDataSchemaApplyJob = yup.InferType<typeof schemaApplyJob>

//interview
export const schemaInterview = yup.object({
  team: yup.object().required(RULE_MESSAGES.MC1('team')),
  job_name: yup.string().required(RULE_MESSAGES.MC1('job_name')),
  interviewers: yup.object().required(RULE_MESSAGES.MC1('interviewers')),
  date: yup.string().required(RULE_MESSAGES.MC1('date')),
  from_date: yup.string().required(RULE_MESSAGES.MC1('from_date')),
  to_date: yup.string().required(RULE_MESSAGES.MC1('to_date')),
  description: yup.string(),
})

export type FormDataSchemaInterview = yup.InferType<typeof schemaInterview>

export const schemaFeedback = yup.object({
  name: yup.string().required(RULE_MESSAGES.MC1('name')),
  description: yup.string(),
})

export type FormDataSchemaFeedback = yup.InferType<typeof schemaFeedback>