import { CANDIDATE_SOURCE_STATE } from 'shared/components/autocomplete/candidate-source-auto-complete'
import { RULE_MESSAGES } from 'shared/constants/vaildate'
import { FormDataSchemaNote, schemaNote } from 'shared/schema'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup
    .string()
    .required(RULE_MESSAGES.MC1('phone'))
    .matches(/^\+?\d+$/, RULE_MESSAGES.MC5('phone'))
    .min(8, RULE_MESSAGES.MC2('phone', 8, 15))
    .max(15, RULE_MESSAGES.MC2('phone', 8, 15)),
  email: yup
    .string()
    .email(RULE_MESSAGES.MC5('email'))
    .required(RULE_MESSAGES.MC1('email'))
    .max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),

  //add
  country: yup.string(),
  reference_type: yup.string().required(RULE_MESSAGES.MC1('candidate_source')),
  reference_value: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate_source_value')),
  reference_uid: yup
    .string()
    .when(['candidate_source'], ([candidate_source], schema) => {
      const isRequired = CANDIDATE_SOURCE_STATE.REC === candidate_source
      return isRequired
        ? schema.required(RULE_MESSAGES.MC1('recruiter'))
        : schema.notRequired()
    }),
  recruit_time: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  // candidate_skill: yup.array(),
  description: yup.string(),
  attachments: yup.array(),
})

export type FormDataSchema = yup.InferType<typeof schema>

export const schemaUpdate = yup.object({
  name: yup
    .string()
    .required(RULE_MESSAGES.MC1('name'))
    .max(64, RULE_MESSAGES.MC4('name', 64)),
  phone: yup
    .string()
    .required(RULE_MESSAGES.MC1('phone'))
    .matches(/^\+?\d+$/, RULE_MESSAGES.MC5('phone'))
    .min(8, RULE_MESSAGES.MC2('phone', 8, 15))
    .max(15, RULE_MESSAGES.MC2('phone', 8, 15)),
  email: yup
    .string()
    .email(RULE_MESSAGES.MC5('email'))
    .required(RULE_MESSAGES.MC1('email'))
    .max(64, RULE_MESSAGES.MC4('email', 64)),
  dob: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  note: yup.string(),

  //add
  country: yup.string(),
  reference_type: yup.string().required(RULE_MESSAGES.MC1('candidate_source')),
  reference_value: yup
    .string()
    .required(RULE_MESSAGES.MC1('candidate_source_value')),
  reference_uid: yup
    .string()
    .when(['candidate_source'], ([candidate_source], schema) => {
      const isRequired = CANDIDATE_SOURCE_STATE.REC === candidate_source
      return isRequired
        ? schema.required(RULE_MESSAGES.MC1('recruiter'))
        : schema.notRequired()
    }),
  recruit_time: yup.date().typeError(RULE_MESSAGES.MC5('dob')).nullable(),
  // candidate_skill: yup.array(),
  description: yup.string(),
  attachments: yup.array(),
})

export type FormDataSchemaUpdate = yup.InferType<typeof schemaUpdate>

export const schemaDelete = schemaNote
export type FormDataSchemaDelete = FormDataSchemaNote

export const schemaBlackList = yup.object({
  note: yup.string(),
  is_black_list: yup.boolean().required(RULE_MESSAGES.MC1('is_black_list')),
})
export type FormDataSchemaBlackList = yup.InferType<typeof schemaBlackList>
